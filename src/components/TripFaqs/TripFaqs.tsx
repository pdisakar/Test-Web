'use client';
import React, { useState, useRef, useEffect } from 'react';

interface GroupFaq {
  id?: string | number;
  question: string;
  answer: string;
}

interface FaqSection {
  sectionTitle?: string;
  faqs: GroupFaq[];
}

interface FaqAccordionProps {
  data: string | GroupFaq[];
}

const TripFaqs: React.FC<FaqAccordionProps> = ({ data }) => {
  const [activeIndexes, setActiveIndexes] = useState<
    Record<string, number | null>
  >({});

  const [sections, setSections] = useState<FaqSection[]>([]);
  const contentRefs = useRef<Record<string, Array<HTMLDivElement | null>>>({});

  useEffect(() => {
    if (!data) {
      setSections([]);
      return;
    }

    if (typeof data === 'string') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const sectionsArr: FaqSection[] = [];
      let currentSection: FaqSection | null = null;

      Array.from(doc.body.children).forEach(el => {
        if (el.tagName === 'H3') {
          currentSection = { sectionTitle: el.textContent || '', faqs: [] };
          sectionsArr.push(currentSection);
        } else if (el.tagName === 'H4' && currentSection) {
          currentSection.faqs.push({
            question: el.textContent || '',
            answer: '',
          });
        } else if (el.tagName === 'P' && currentSection) {
          const lastFaq = currentSection.faqs[currentSection.faqs.length - 1];
          if (lastFaq) {
            lastFaq.answer = el.outerHTML;
          }
        }
      });

      setSections(sectionsArr);
    } else if (Array.isArray(data)) {
      setSections([{ faqs: data }]);
    } else {
      setSections([]);
    }
  }, [data]); 

  const toggle = (sectionKey: string, index: number) => {
    setActiveIndexes(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey] === index ? null : index,
    }));
  };

  return (
    <div className="faq-accordion">
      {sections.map((section, sectionIndex) => {
        const sectionKey = `section-${sectionIndex}`;
        contentRefs.current[sectionKey] = contentRefs.current[sectionKey] || [];

        return (
          <div
            key={sectionKey}
            className="faq-section mb-8">
            {section.sectionTitle && (
              <div className="title mb-4">
                <h4>{section.sectionTitle}</h4>
              </div>
            )}

            {section.faqs.map((faq, faqIndex) => {
              const isActive = activeIndexes[sectionKey] === faqIndex;
              const key = faq.id ?? faqIndex;

              return (
                <div
                  key={key}
                  className="accordion-item border-b py-4 border-primary/50 border-dashed">
                  <button
                    onClick={() => toggle(sectionKey, faqIndex)}
                    className="w-full font-bold text-lg flex justify-between items-center text-left"
                    aria-expanded={isActive}
                    aria-controls={`faq-content-${sectionKey}-${key}`}>
                    <span>{faq.question}</span>

                    <svg
                      className={`icon transition-transform duration-300 ${
                        isActive ? 'rotate-180' : ''
                      }`}
                      width="13"
                      height="7">
                      <use
                        xlinkHref="/icons.svg#arrow-down"
                        fill="currentColor"
                      />
                    </svg>
                  </button>

                  <div
                    id={`faq-content-${sectionKey}-${key}`}
                    ref={el => {
                      contentRefs.current[sectionKey][faqIndex] = el;
                    }}
                    style={{
                      maxHeight: isActive
                        ? `${
                            contentRefs.current[sectionKey][faqIndex]
                              ?.scrollHeight || 0
                          }px`
                        : '0px',
                      overflow: 'hidden',
                      transition: 'max-height 0.3s ease',
                    }}
                    className="accordion-content text-gray-700 leading-relaxed">
                    <article
                      className="pt-2"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default TripFaqs;
