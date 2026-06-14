import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import ChatPreview from '@/assets/images/Screenshot_12_1.png';

function CommuntityPreview() {
  //

  return (
    <section className='max-w-[1200px] py-32 mx-auto max-[1200px]:max-w-2xl  max-md:px-4'>
      <div className='flex flex-col items-center'>
        <SectionHeader
          className='w-full pb-2 text-center'
          subheader='Community'
          header='Get in touch with your friends'
          type='large'
        />
        <p className='w-[560px] text-center pb-8 max-[560px]:w-full'>
          Get in touch with your friends without the houstle in one
          place.
        </p>
        <img
          src={ChatPreview}
          className='aspect-auto w-[900px] drop-shadow-lg max-[900px]:w-full'
        />
      </div>
    </section>
  );
}

export default CommuntityPreview;
