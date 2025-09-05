'use client';

import React from 'react';
import { PDFDocument, StandardFonts } from 'pdf-lib';
import { BASE_URL, COMPANY_NAME } from '@/lib/constants';

export interface PrintPDFProps {
  title: string;
  itinerary: any[];
  const_include: string;
  cost_exclude: string;
  price: number;
  duration_type: string;
  package_abstract?: string;
  destination?: { title: string };
  package_duration?: number | string;
  grade?: { title: string };
  style?: { title: string };
  accommodation?: { title: string };
  package_max_altitude?: number;
  transportation?: { title: string };
  package_group_size?: number;
  package_highlights?: string;
  package_details?: string;
  package_trip_info?: string;
  pricegroup?: Array<{
    id: number;
    min_people: number;
    max_people: number;
    unit_price: number;
    offer_unit_price: number;
    offer_label?: string;
  }>;
  bestseason?: string;
}

const PrintPDF: React.FC<PrintPDFProps> = props => {
  const handleGeneratePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pageSize: [number, number] = [595.28, 841.89]; // A4
    const marginLeft = 50;
    const marginRight = 50;
    const lineHeight = 20;
    const usableWidth = pageSize[0] - marginLeft - marginRight;

    const pageTopMargin = 30;
    const pageBottomMargin = 30;
    const footerSpacing = 20;
    const endY = pageBottomMargin + footerSpacing;

    let pages: any[] = [];
    let page = pdfDoc.addPage(pageSize);
    pages.push(page);
    let y = 0;

    const drawHeader = (currentPage: any) => {
      currentPage.drawText(BASE_URL, {
        x: marginLeft,
        y: pageSize[1] - pageTopMargin,
        size: 10,
        font,
      });
      y = pageSize[1] - pageTopMargin - 50;
    };

    const addNewPage = () => {
      page = pdfDoc.addPage(pageSize);
      pages.push(page);
      drawHeader(page);
    };

    const splitText = (text: string, fontSize: number) => {
      const words = text.split(/\s+/);
      const lines: string[] = [];
      let line = '';
      words.forEach(word => {
        const test = line ? line + ' ' + word : word;
        if (font.widthOfTextAtSize(test, fontSize) > usableWidth && line) {
          lines.push(line);
          line = word;
        } else {
          line = test;
        }
      });
      if (line) lines.push(line);
      return lines;
    };

    const drawText = (text: string, size = 13, indent = 0) => {
      const lines = splitText(text, size);
      for (const line of lines) {
        if (y - lineHeight < endY) {
          addNewPage();
        }
        page.drawText(line, { x: marginLeft + indent, y, size, font });
        y -= lineHeight;
      }
    };

    const drawSection = (heading: string, content: string) => {
      if (y - 40 < endY) addNewPage();
      y -= 20;
      page.drawText(heading, { x: marginLeft, y, size: 21, font: boldFont });
      y -= 40;

      const hasLists = /<ul|<ol|<li/.test(content);
      if (hasLists) {
        const listItems = content.match(/<li[^>]*>([\s\S]*?)<\/li>/g) || [];
        listItems.forEach(item => {
          const cleanText = item.replace(/<[^>]+>/g, '').trim();
          if (cleanText) {
            drawText('• ' + cleanText, 13, 10);
            y -= 2;
          }
        });
      } else {
        const paragraphs = content
          .replace(/<[^>]+>/g, '')
          .split(/\r?\n\s*\r?\n/)
          .filter(Boolean);
        paragraphs.forEach(paragraph => {
          const cleanParagraph = paragraph.trim();
          if (cleanParagraph) {
            drawText(cleanParagraph, 13, 0);
            y -= 8;
          }
        });
      }
    };

    // ----- Start writing content -----
    drawHeader(page);

    page.drawText(props.title || '', {
      x: marginLeft,
      y,
      size: 26,
      font: boldFont,
    });
    y -= 50;

    // Package Abstract
    if (props.package_abstract) {
      drawSection('Package Overview', props.package_abstract);
    }

    // Package Information
    const packageInfo: string[] = [];
    if (props.destination?.title)
      packageInfo.push(`Destination: ${props.destination.title}`);
    if (props.package_duration)
      packageInfo.push(
        `Duration: ${props.package_duration} ${props.duration_type}`
      );
    if (props.grade?.title)
      packageInfo.push(`Trip Difficulty: ${props.grade.title}`);
    if (props.style?.title) packageInfo.push(`Activity: ${props.style.title}`);
    if (props.accommodation?.title)
      packageInfo.push(`Accommodation: ${props.accommodation.title}`);
    if (props.package_max_altitude)
      packageInfo.push(`Max Elevation: ${props.package_max_altitude}m`);
    if (props.transportation?.title)
      packageInfo.push(`Transportation: ${props.transportation.title}`);
    if (props.package_group_size)
      packageInfo.push(`Group Size: Min. ${props.package_group_size} Pax`);
    if (props.bestseason) packageInfo.push(`Best Season: ${props.bestseason}`);

    if (packageInfo.length > 0) {
      if (y - 40 < endY) addNewPage();
      y -= 20;
      page.drawText('Package Information', {
        x: marginLeft,
        y,
        size: 21,
        font: boldFont,
      });
      y -= 40;
      packageInfo.forEach(info => drawText(info, 13, 10));
    }

    // Pricing Information
    if (props.price || props.pricegroup?.length) {
      if (y - 40 < endY) addNewPage();
      y -= 20;
      page.drawText('Pricing Information', {
        x: marginLeft,
        y,
        size: 21,
        font: boldFont,
      });
      y -= 40;
      if (props.price) {
        drawText(`From: US$ ${props.price} per person`, 16, 10);
      }
      if (props.pricegroup?.length) {
        drawText('Group Discount Available:', 13, 10);
        props.pricegroup.forEach(group => {
          const peopleText =
            group.min_people === group.max_people
              ? `${group.min_people} Person`
              : `${group.min_people}-${group.max_people} People`;
          drawText(`• ${peopleText}: US$ ${group.unit_price}`, 13, 20);
        });
      }
    }

    // Highlights
    if (props.package_highlights) {
      drawSection('Highlights', props.package_highlights);
    }

    // Package Details
    if (props.package_details) {
      drawSection('Overview', props.package_details);
    }

    // Itinerary
    if (props.itinerary?.length) {
      if (y - 40 < endY) addNewPage();
      y -= 20;
      page.drawText('Detailed Itinerary', {
        x: marginLeft,
        y,
        size: 21,
        font: boldFont,
      });
      y -= 40;

      props.itinerary.forEach((itm, idx) => {
        drawText(
          `${props.duration_type === 'days' ? 'Day' : 'Step'} ${idx + 1}: ${
            itm.itinerary_title
          }`,
          16
        );
        drawText(itm.itinerary_description.replace(/<[^>]+>/g, ''), 13, 10);
        y -= 15;
      });
    }

    // Includes & Excludes
    if (props.const_include)
      drawSection("What's Included", props.const_include);
    if (props.cost_exclude)
      drawSection("What's Not Included", props.cost_exclude);

    // Trip Info
    if (props.package_trip_info) {
      drawSection('Good to Know Before', props.package_trip_info);
    }

    // ----- Draw footers after all pages are created -----
    const totalPages = pages.length;
    pages.forEach((p, index) => {
      const footerY = pageBottomMargin;
      const currentPage = index + 1;

      // Left: Page count
      const pageText = `Page ${currentPage} of ${totalPages}`;
      p.drawText(pageText, {
        x: marginLeft,
        y: footerY,
        size: 10,
        font,
      });

      // Right: COMPANY_NAME
      const companyWidth = font.widthOfTextAtSize(COMPANY_NAME, 10);
      p.drawText(COMPANY_NAME, {
        x: pageSize[0] - marginRight - companyWidth,
        y: footerY,
        size: 10,
        font,
      });
    });

    // ----- Save and download -----
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
      type: 'application/pdf',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${props.title || 'document'}.pdf`;
    link.click();
  };

  return (
    <button
      className="btn btn-secondary w-full flex items-center justify-center gap-1 text-sm font-semibold text-primary" 
      onClick={handleGeneratePDF}>
      <svg
        className="icon text-primary"
        width="24"
        height="24">
        <use
          xlinkHref={`/icons.svg#print-pdf`}
          fill="currentColor"
        />
      </svg>
      Get Broucher
    </button>
  );
};

export default PrintPDF;
