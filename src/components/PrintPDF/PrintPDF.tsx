'use client';

import React from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { BASE_URL, COMPANY_NAME } from '@/lib/constants';

export interface PrintPDFProps {
  title: string;
  itinerary: any[];
  const_include: string;
  cost_exclude: string;
  price: number;
  duration_type: string;
}

const PrintPDF: React.FC<PrintPDFProps> = ({
  title,
  itinerary,
  const_include,
  cost_exclude,
  duration_type,
}) => {
  const handleGeneratePDF = async () => {
    const pdfDoc = await PDFDocument.create();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    const pageSize: [number, number] = [595.28, 841.89];
    const marginLeft = 50;
    const lineHeight = 14;
    const usableWidth = 480;

    const pageTopMargin = 30;
    const pageBottomMargin = 30;

    const headerSpacing = 20; 
    const footerSpacing = 20; 

    const startY = pageSize[1] - pageTopMargin - headerSpacing;
    const endY = pageBottomMargin + footerSpacing;

    let page = pdfDoc.addPage(pageSize);
    let y = startY;

    const drawHeader = (currentPage: any) => {
      currentPage.drawText(BASE_URL, {
        x: marginLeft,
        y: pageSize[1] - pageTopMargin, 
        size: 10,
        font,
      });
    };

    const drawFooter = (currentPage: any) => {
      currentPage.drawText(`${COMPANY_NAME}`, {
        x: marginLeft,
        y: pageBottomMargin,
        size: 10,
        font,
      });
    };

    drawHeader(page);
    drawFooter(page);

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

    const drawText = (text: string, size = 10, indent = 0) => {
      const lines = splitText(text, size);
      for (const line of lines) {
        if (y - lineHeight < endY) {
          page = pdfDoc.addPage(pageSize);
          drawHeader(page);
          drawFooter(page);
          y = startY; 
        }
        page.drawText(line, { x: marginLeft + indent, y, size, font });
        y -= lineHeight;
      }
    };

    const drawSection = (heading: string, content: string) => {
      if (y - 40 < endY) {
        page = pdfDoc.addPage(pageSize);
        drawHeader(page);
        drawFooter(page);
        y = startY;
      }
      y -= 20;
      page.drawText(heading, { x: marginLeft, y, size: 16, font: boldFont });
      y -= 20;
      content
        .replace(/<[^>]+>/g, '')
        .split(/\r?\n|•|-/)
        .filter(Boolean)
        .forEach(line => drawText('• ' + line, 10, 10));
    };

    page.drawText(title || '', { x: marginLeft, y, size: 20, font: boldFont });
    y -= 40;

    itinerary?.forEach((itm, idx) => {
      drawText(
        `${duration_type === 'days' ? 'Day' : 'Step'} ${idx + 1}: ${
          itm.itinerary_title
        }`,
        12
      );
      drawText(itm.itinerary_description.replace(/<[^>]+>/g, ''), 10, 10);
      y -= 10;
    });

    if (const_include) drawSection("What's Included", const_include);
    if (cost_exclude) drawSection("What's Not Included", cost_exclude);

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes.buffer as ArrayBuffer], {
      type: 'application/pdf',
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title || 'document'}.pdf`;
    link.click();
  };

  return (
    <button
      className="btn btn-secondary w-full"
      onClick={handleGeneratePDF}>
      Generate PDF
    </button>
  );
};

export default PrintPDF;
