import React from 'react';

const platforms = [
  'facebook',
  'instagram',
  'twitter',
  'youtube',
  'linkedin',
  'pinterest',
  'tiktok',
] as const;

type Platform = (typeof platforms)[number];

interface SocialMediaProps {
  globalData?: {
    data?: Partial<Record<Platform, string>> & { [key: string]: any };
    [key: string]: any;
  };
}

const SocialMedia: React.FC<SocialMediaProps> = ({ globalData = {} }) => {
  const data = globalData.data || {};

  return (
    <ul className="flex gap-[8px]">
      {platforms.map(platform => {
        const url = data[platform];

        const icon = (
          <svg className="icon" width="32" height="32" fill="currentColor">
            <use xlinkHref={`/icons.svg#${platform}`} />
          </svg>
        );

        return (
          <li key={platform}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit our ${platform} page`}
              >
                {icon}
              </a>
            ) : (
              icon
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SocialMedia;
