import Link from 'next/link';

import AddIcon from '@/components/icons/addIcon';
import { RoundedButton } from '@/components/ui/buttons';
import Container, { DesktopContainer, SearchBarContainer } from '@/components/ui/containers';
import { SearchInput } from '@/components/ui/inputs';
import { Subtitle } from '@/components/ui/texts';

export default function Penalties() {
  return (
    <section className="relative flex size-full flex-col items-center">
      <DesktopContainer>
        <Container>
          <SearchBarContainer>
            <Subtitle>Penalties List</Subtitle>
            <div className="flex items-center gap-4">
              <div className="w-72">
                <SearchInput />
              </div>
              <Link href={'penalties/add'}>
                <RoundedButton label={<AddIcon className="size-3 fill-black stroke-black" />} />
              </Link>
            </div>
          </SearchBarContainer>
        </Container>
      </DesktopContainer>
    </section>
  );
}
