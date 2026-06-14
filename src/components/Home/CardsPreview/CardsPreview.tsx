import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import cardsPreviewTwo from '/src/assets/images/Screenshot_9_1.png';
import HomePageFeature from '../HomePageFeature';

function CardsPreview() {
  return (
    <section className='max-w-[1200px] py-32 mx-auto flex gap-24 max-[1200px]:flex-col-reverse max-[1200px]:max-w-2xl max-md:gap-8 max-md:px-4 max-sm:py-16'>
      <div className='w-full relative'>
        {/* <div className='absolute rounded-full bg-orange-vivid-400 h-[600px] w-[600px] inset-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 bg-[radial-gradient(169.40%_89.55%_at_94.76%_6.29%,rgba(0,0,0,0.40)_0%,rgba(255,255,255,0.00)_100%)]' /> */}
        <img
          src={cardsPreviewTwo}
          className='aspect-auto w-full shadow-md'
        />
      </div>
      <div className='w-full'>
        <SectionHeader
          className='w-full pb-8'
          subheader='Cards'
          header='Here you can organize your days'
          type='large'
        />
        <div className='flex flex-col gap-8'>
          <HomePageFeature
            icon='partly-sunny'
            header='Weather'
            text='Thanks to integrated weather you can see the forcast for the 3 closest days, so you can easily plan ahead! '
          />
          <HomePageFeature
            icon='swap-horizontal'
            header='Drag and drop'
            text='You can drag your to-dos between the cards with ease.'
          />
          <HomePageFeature
            icon='pencil'
            header='Easy edition'
            text='If you will make any mistakes in your to-dos you can edit them with no problem.'
          />
        </div>
      </div>
    </section>
  );
}

export default CardsPreview;
