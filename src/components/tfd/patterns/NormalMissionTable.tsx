import type { HeadersType } from '@/components/table/types';
import type { NormalDropType } from '@/components/tfd/descendants/types';
import type { FC, ReactNode } from 'react';

import Table from '@/components/table/Table';
import { descendantParts } from '@/components/tfd/patterns/types';
import { calculateAttempts, getLabelClass } from '@/utils/utils';

interface NormalMissionTableProps {
  data: NormalDropType;
}

export const NormalMissionTable: FC<NormalMissionTableProps> = ({ data }) => {
  const { headers, body } = descendantParts.reduce(
    (acc, part) => {
      const { zone, subregion, mission, type, dropRate } = data[part];
      const isPattern = !(typeof mission === 'string');

      const patternLabel = isPattern && (type === 'Outpost' ? `${zone} - ${mission[1]}` : 'Infiltration');
      const patternValue = isPattern && (type === 'Outpost' ? 'Reactor' : mission[1]);
      const missionText = isPattern ? mission[0] : mission;

      const { expectedAttempts, nearlyGuaranteed, nearlyGuaranteedRange } = calculateAttempts(dropRate);

      const attempts = (
        <div className="flex w-1/2 flex-col text-sm lg:text-base">
          <div className="text-left">Expected: {expectedAttempts}</div>
          <div className="text-left">
            Nearly Guaranteed: {nearlyGuaranteed} ± {nearlyGuaranteedRange}
          </div>
        </div>
      );

      acc.headers.push({
        key: part,
        header: (
          <div className="flex flex-col gap-1 text-nowrap p-2 text-left">
            <div className="flex flex-row items-center gap-4 text-lg lg:text-2xl">
              {`${part}${isPattern ? '*' : ''}`}
              {attempts}
            </div>
            {isPattern && (
              <div className="grid grid-cols-2 gap-2">
                <span>Pattern From:</span>
                <span>Opens At:</span>
              </div>
            )}
          </div>
        ),
      });
      const labelClass = getLabelClass(zone);
      const label = subregion ? `${zone} - ${subregion}` : zone;

      acc.rowCells.push(
        <td key={part} className={labelClass}>
          <div
            className={['text-nowrap p-2 text-lg 2xl:text-xl', isPattern && 'grid grid-cols-2 gap-2']
              .filter(string => string)
              .join(' ')}
          >
            <div className="flex w-full flex-col">
              <span>{label}</span>
              <span>{type}</span>
              {missionText && <span>{missionText}</span>}
            </div>
            {isPattern && (
              <div className="flex w-full flex-col">
                <span>{patternLabel}</span>
                <span>{patternValue}</span>
              </div>
            )}
          </div>
        </td>,
      );

      if (acc.rowCells.length === 4) {
        acc['body'] = <tr className="alternating">{acc.rowCells}</tr>;
      }

      return acc;
    },
    { headers: [] as HeadersType[], rowCells: [] as ReactNode[], body: undefined as ReactNode },
  );

  return (
    <Table
      label="Normal Mission Drops"
      sublabel={
        <p className="pb-2 text-center text-lg text-yellow-200 md:text-xl">Parts marked with * are from a Pattern</p>
      }
      className="pattern-data"
      headers={headers}
      body={body}
    />
  );
};

export default NormalMissionTable;
