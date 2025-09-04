import React from 'react';
import Image from 'next/image';

import affiliations1 from '../../../public/Affiliations/Affiliations (1).png';
import affiliations2 from '../../../public/Affiliations/Affiliations (2).png';
import affiliations3 from '../../../public/Affiliations/Affiliations (3).png';
import affiliations4 from '../../../public/Affiliations/Affiliations (4).png';
import affiliations5 from '../../../public/Affiliations/Affiliations (5).png';
import affiliations6 from '../../../public/Affiliations/Affiliations (6).png';
import affiliations7 from '../../../public/Affiliations/Affiliations (7).png';

const Affiliations = () => {
  return (
    <div className="our-affiliations common-box">
      <div className="container">
        <ul className="flex gap-6 flex-wrap justify-between items-center">
          <li>
            <Image
              src={affiliations1}
              alt="Affiliation 1"
              title="Affiliation 1"
              width={66}
              height={60}
              className="object-contain"
            />
          </li>

          <li>
            <Image
              src={affiliations2}
              alt="Affiliation 2"
              title="Affiliation 2"
              width={71}
              height={60}
              className="object-contain"
            />
          </li>

          <li>
            <Image
              src={affiliations3}
              alt="Affiliation 3"
              title="Affiliation 3"
              width={70}
              height={60}
              className="object-contain"
            />
          </li>

          <li>
            <Image
              src={affiliations4}
              alt="Affiliation 4"
              title="Affiliation 4"
              width={44}
              height={60}
              className="object-contain"
            />
          </li>

          <li>
            <Image
              src={affiliations5}
              alt="Affiliation 5"
              title="Affiliation 5"
              width={188}
              height={40}
              className="object-contain"
            />
          </li>

          <li>
            <Image
              src={affiliations6}
              alt="Affiliation 6"
              title="Affiliation 6"
              width={199}
              height={40}
              className="object-contain"
            />
          </li>

          <li>
            <Image
              src={affiliations7}
              alt="Affiliation 7"
              title="Affiliation 7"
              width={185}
              height={33}
              className="object-contain"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Affiliations;
