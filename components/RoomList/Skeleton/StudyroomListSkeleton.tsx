import { styled } from 'styled-components';

import { StudyroomCardSkeleton } from '@/components/RoomCard/Skeleton';

const StudyroomListSkeleton = () => {
  return (
    <StStudyroomListWrapper>
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
      <StudyroomCardSkeleton />
    </StStudyroomListWrapper>
  );
};

export default StudyroomListSkeleton;

const StStudyroomListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  margin-top: 2rem;
  margin-bottom: 8rem;
`;
