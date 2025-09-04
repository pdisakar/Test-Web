'use client';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import PrintPDF, { PrintPDFProps } from './PrintPDF';
import { COMPANY_NAME } from '@/lib/constants';
import { jsPDF } from 'jspdf';

const PrintController: React.FC<PrintPDFProps> = props => {
  const handleGeneratePDF = async () => {
    const { title, ...rest } = props;
    const pdfTitle = title ?? '';

    const htmlString = ReactDOMServer.renderToStaticMarkup(
      <PrintPDF {...rest} />
    );

    const element = document.createElement('div');
    element.style.width = '794px';
    element.style.boxSizing = 'border-box';
    const scaleFactor = 0.7; // make content smaller
    element.innerHTML = `<div style="transform: scale(${scaleFactor}); transform-origin: top left; width: ${(
      100 / scaleFactor
    ).toFixed(2)}%;">${htmlString}</div>`;

    const margins = { top: 25, right: 15, bottom: 25, left: 15 };

    const doc = new jsPDF({
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
    });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    await doc.html(element, {
      x: margins.left,
      y: margins.top + 10,
      width: pageWidth - margins.left - margins.right,
      html2canvas: {
        scale: 1,
        useCORS: true,
        windowWidth: 794,
        letterRendering: true,
      },
      callback: pdf => {
        const totalPages = (pdf as any).getNumberOfPages?.() ?? 1;
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i);

          // Header title
          pdf.setFontSize(14);
          pdf.setTextColor(26, 32, 44);
          pdf.setFont('helvetica', 'bold');
          pdf.text(pdfTitle, pageWidth / 2, margins.top, { align: 'center' });
          pdf.setFont('helvetica', 'normal');

          // Footer line and texts
          pdf.setFontSize(8);
          pdf.setTextColor(136, 136, 136);
          const lineY = pageHeight - 18;
          pdf.setDrawColor(204, 204, 204);
          pdf.line(margins.left, lineY, pageWidth - margins.right, lineY);

          const textY = pageHeight - 14;
          const copyrightText = `© ${new Date().getFullYear()} ${COMPANY_NAME}. All rights reserved.`;
          pdf.text(copyrightText, margins.left, textY, { align: 'left' });

          const pageNumText = `Page ${i} of ${totalPages}`;
          pdf.text(pageNumText, pageWidth - margins.right, textY, {
            align: 'right',
          });
        }

        pdf.save(`${pdfTitle || 'document'}.pdf`);
      },
    });
  };

  return (
    <button
      className="btn btn-secondary w-full mt-4"
      onClick={handleGeneratePDF}>
      Generate PDF
    </button>
  );
};

export default PrintController;
