import { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';

interface CheckboxProps {
  language: string;
  setSelectedLanguages: Dispatch<SetStateAction<string[]>>;
}

const Checkbox = ({ language, setSelectedLanguages }: CheckboxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLanguages((prev) =>
      e.target.checked
        ? [...prev, e.target.name]
        : prev.filter((lang) => lang !== e.target.name),
    );
  };

  return (
    <StCheckboxWrapper>
      <input
        type="checkbox"
        id={language}
        name={language}
        onChange={handleChange}
      />
      <label htmlFor={language}>{language}</label>
    </StCheckboxWrapper>
  );
};

export default Checkbox;

const StCheckboxWrapper = styled.div`
  & > label {
    ${({ theme }) => theme.fonts.Body3};
  }
`;
