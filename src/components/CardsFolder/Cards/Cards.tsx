import CardComponent from '../Card/Card';
import classes from './Cards.module.css';

import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';

import cardClasses from '../Card/Card.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchForecast } from '../../../api/api';

import { DragDropContext } from 'react-beautiful-dnd';
import { flushSync } from 'react-dom';
import clsx from '@/utils/clsx';
import Toolbar from '../Toolbar/Toolbar';
import FormCards from '../FormCard/FormCard';

import 'react-toastify/dist/ReactToastify.css';
import { cardActions } from '../../../store/card';
import { WholeState } from '@/types';
import Button from '@/components/common/Button/Button';
import { TailSpin } from 'react-loader-spinner';

const Cards = function () {
  const dispatch = useDispatch();

  const cards = useSelector((state: WholeState) => state.cards.cards);
  const isLoading = useSelector(
    (state: WholeState) => state.cards.isLoading
  );
  const favorite = useSelector(
    (state: WholeState) => state.weather.showOnCards
  );
  const searched = useSelector(
    (state: WholeState) => state.cards.searched
  );
  const hideHappened = useSelector(
    (state: WholeState) => state.cards.hideHappened
  );

  const [searchedIds, setSearchedIds] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  const { data: forecastData } = useQuery(
    ['forecast', favorite],
    () => {
      if (!favorite) return undefined;

      return fetchForecast({ city: favorite });
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 12,
    }
  );

  useEffect(() => {
    if (searched) {
      const foundCards = cards?.filter((card) =>
        card.tasks?.find((task) => {
          return task.content
            .toLowerCase()
            .includes(searched.toLowerCase()!);
        })
      );

      const cardsIds: string[] = [];

      foundCards.forEach((card) => {
        cardsIds.push(card.id);
      });

      setSearchedIds(cardsIds);
    }
  }, [searched, cards]);

  const hasCards = cards?.length > 0;

  // const resultDrop = {
  //   draggableId: task.id,
  //   type: 'TYPE',
  //   reason: 'DROP',
  //   source: {
  //     droppableId: card.id,
  //     index: 0,
  //   },
  //   destination: {
  //     droppableId: card.id,
  //     index: 1,
  //   },
  // };

  const onDragEnd = function (result: any) {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Maybe not the best, but works fine and fixes the issue
    flushSync(() => {
      dispatch(
        cardActions.moveTaskBetweenCards({
          destination,
          source,
          draggableId,
        })
      );
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='max-w-[1532px] m-auto overflow-hidden bg-white border border-solid border-grey-200 rounded-2xl max-[1800px]:max-w-[1232px] max-[1500px]:max-w-[1000px] max-[1250px]:max-w-[632px] max-[900px]:max-w-[300px] max-[300px]:max-w-[262px]'>
        <div className='m-auto'>
          <Toolbar setShowForm={setShowForm} />
          {showForm && <FormCards setShowForm={setShowForm} />}
          <TransitionGroup
            component='div'
            className={clsx(
              'relative grid grid-cols-5 gap-8 justify-items-center p-4 bg-white max-[1800px]:grid-cols-4 max-[1500px]:grid-cols-3 max-[1250px]:grid-cols-2 max-[900px]:grid-cols-1',
              !hasCards && 'h-[500px]'
            )}
          >
            {!hasCards && (
              <CSSTransition
                classNames={{
                  enterActive: classes['messageEnterActive'],
                  enter: classes['messageEnter'],
                  exitActive: classes['messageExitActive'],
                  exit: classes['messageExit'],
                }}
                timeout={300}
              >
                {/* message */}
                <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center w-[600px] max-[900px]:w-[240px] max-[300px]:w-[230px]'>
                  {isLoading && (
                    <TailSpin
                      height='100'
                      width='100'
                      color='#d87620'
                      ariaLabel='tail-spin-loading'
                      radius='0'
                      wrapperStyle={{}}
                      wrapperClass=''
                      visible={true}
                    />
                  )}
                  {!isLoading && (
                    <>
                      <h4 className='p-4 text-5xl text-yellow-900 text-center rounded-lg '>
                        There are no plans yet
                      </h4>
                      <p className='text-lg mb-6'>
                        So why don&apos;t you make a new one?
                      </p>
                      <Button
                        onClick={() => {
                          setShowForm((prevState) => !prevState);
                        }}
                        color='Green'
                        variant='RoundedSquare'
                      >
                        Create a new card
                      </Button>
                    </>
                  )}
                </div>
              </CSSTransition>
            )}
            {cards.map((card) => {
              if (searched && searchedIds.indexOf(card.id) === -1) {
                return null;
              }

              if (hideHappened) {
                const now = new Date().toLocaleDateString('pl-PL');
                const then = card.id;

                const nowToFormat: any = now.split('.');
                const thenToFormat: any = then.split('.');

                const nowInSeconds = new Date(
                  +nowToFormat[2],
                  nowToFormat[1] - 1,
                  +nowToFormat[0]
                );
                const thenInSeconds = new Date(
                  +thenToFormat[2],
                  thenToFormat[1] - 1,
                  +thenToFormat[0]
                );

                if (nowInSeconds > thenInSeconds) {
                  return null;
                }
              }

              return (
                <CSSTransition
                  key={card.id}
                  classNames={{
                    enterActive: cardClasses['fadeEnterActive'],
                    enter: cardClasses['fadeEnter'],
                    exitActive: cardClasses['fadeExitActive'],
                    exit: cardClasses['fadeExit'],
                  }}
                  timeout={300}
                >
                  <CardComponent
                    key={card.id}
                    card={card}
                    forecastDay={forecastData?.forecast?.forecastday}
                  />
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Cards;
