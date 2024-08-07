import type { ArchesType, AttributesType } from '@/utils/attributes/types';
import type { BaseStat } from '@/utils/types';

export type DescendantStat = {
  level: number;
  stat_detail: BaseStat[];
};

export type SkillData = {
  skill_type: string;
  skill_name: string;
  element_type: AttributesType;
  arche_type: ArchesType;
  skill_image_url: string;
  skill_description: string;
};

export type DescendantAPIData = {
  descendant_id: string;
  descendant_name: string;
  descendant_image_url: string;
  descendant_stat: DescendantStat[];
  descendant_skill: SkillData[];
};

export type FormattedDescendantData = {
  is_ultimate: boolean;
  descendant_id: string;
  descendant_name: string;
  descendant_image_url: string;
  descendant_stat: DescendantStat;
  descendant_skill: SkillData[];
  attribute: AttributesType;
};
