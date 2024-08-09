import { useState } from 'react';

import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';

interface ModuleLevelProps {
  currentLevel: number;
  maxLevel: number;
  setLevel: Dispatch<SetStateAction<number>>;
}

const ModuleLevel: FC<ModuleLevelProps> = ({ currentLevel, maxLevel, setLevel }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const levelPills = [] as ReactNode[];
  for (let i = 0; i < maxLevel; i++) {
    const isGreen = i <= (hoveredIndex ?? currentLevel);
    const backgroundClass = isGreen ? 'bg-green-500' : 'bg-slate-700';
    levelPills.push(
      <button
        key={i}
        className={i < maxLevel - 1 ? 'pt-0.5' : undefined}
        onClick={() => setLevel(i)}
        onMouseEnter={() => setHoveredIndex(i)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <div
          className={['h-[7px] w-3 rounded-sm border-1 border-white hover:bg-green-500', backgroundClass].join(' ')}
        />
      </button>,
    );
  }
  levelPills.reverse();

  return <div className="flex flex-col self-end">{levelPills}</div>;
};

export default ModuleLevel;
