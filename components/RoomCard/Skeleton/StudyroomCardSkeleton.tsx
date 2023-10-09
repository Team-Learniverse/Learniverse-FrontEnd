import { styled } from 'styled-components';

const StudyroomCardSkeleton = () => {
  return <StCardSkeleton />;
};

export default StudyroomCardSkeleton;

const StCardSkeleton = styled.div`
  width: 14.1rem;
  height: 18.6rem;

  border-radius: 1.6rem;
  background: ${({ theme }) => theme.colors.Gray4};
`;
