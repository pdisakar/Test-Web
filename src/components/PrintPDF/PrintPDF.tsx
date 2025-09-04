import React from 'react';

export interface PrintPDFProps {
  title: string;
  itinerary: any[];
  const_include: string;
  cost_exclude: string;
  price: number;
  duration_type: string;
}

const PrintPDF: React.FC<Omit<PrintPDFProps, 'title'>> = ({
  itinerary,
  const_include,
  cost_exclude,
  duration_type,
}) => {
  return (
    <div className="p-4 font-primary text-gray-800">
      <style>{`
        .avoid-break {
          page-break-inside: avoid !important;
        }
      `}</style>

      {itinerary && itinerary.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">
            Detailed Itinerary
          </h2>
          <div className="space-y-6">
            {itinerary.map((itm, idx) => (
              <div
                key={idx}
                className="avoid-break pt-2">
                <h4 className="text-xl font-bold text-gray-900">
                  {duration_type === 'days' ? 'Day' : 'Step'} {idx + 1}:{' '}
                  {itm.itinerary_title}
                </h4>
                <article
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: itm.itinerary_description,
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {const_include && (
        <section className="avoid-break pt-4 mb-8">
          <h2 className="text-2xl font-semibold text-green-700 border-b-2 border-green-200 pb-2 mb-6">
            What's Included
          </h2>
          <article
            className=""
            dangerouslySetInnerHTML={{ __html: const_include }}
          />
        </section>
      )}

      {cost_exclude && (
        <section className="avoid-break pt-4 mb-8">
          <h2 className="text-2xl font-semibold text-red-700 border-b-2 border-red-200 pb-2 mb-6">
            What's Not Included
          </h2>
          <article
            className=""
            dangerouslySetInnerHTML={{ __html: cost_exclude }}
          />
        </section>
      )}
    </div>
  );
};

export default PrintPDF;
