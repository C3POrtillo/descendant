export const getDamageReduction = (defense: number) => 1 - 150 / (Math.sqrt(defense) + 150);
export const getEffectiveHealth = (maxHPShield: number, damageReduction: number) => maxHPShield / (1 - damageReduction);

export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === '.' || e.key === ',') {
    e.preventDefault();
  }
};

export const handlePaste = (
  e: React.ClipboardEvent<HTMLInputElement>,
  setValue: React.Dispatch<React.SetStateAction<string>>,
) => {
  e.preventDefault();
  const pastedData = e.clipboardData.getData('Text');
  const processedData = pastedData.split('.')[0].replace(/\D/g, '');
  setValue(processedData);
};
