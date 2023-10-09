import { styled } from 'styled-components';

import { IcConfirm } from '@/public/assets/icons';

interface DeleteButtonProps {
  btnName: string;
  onClick: () => void;
}

const DeleteButton = ({ btnName, onClick }: DeleteButtonProps) => {
  return (
    <StConfirmButtonWrapper type="button" onClick={onClick}>
      <IcConfirm />
      {btnName}
    </StConfirmButtonWrapper>
  );
};

export default DeleteButton;

export const StConfirmButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  width: fit-content;
  height: 3.5rem;
  padding: 0.9rem 2rem 0.9rem 1.2rem;

  border-radius: 8rem;
  box-shadow: 2.48px 2.48px 9.92px 1.65333px rgba(0, 0, 0, 0.16);
  background: ${({ theme }) => theme.colors.Purple4};
  color: ${({ theme }) => theme.colors.White};
  ${({ theme }) => theme.fonts.Body2};
`;
