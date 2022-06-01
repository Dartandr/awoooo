import React from 'react';
import style from './index.module.scss';
//import Tippy from '@tippyjs/react';
//import { NavLink } from 'react-router-dom';
import scrollProgressBar from '../../helpers/scrollProgressBar';
import Posts from './posts';
//import styleTrailer from "../../modals/trailer/trailerModal.module.css";
//import ShareModal from "../../modals/share/shareModal";
//import TrailerModal from "../../modals/trailer/trailerModal";
import playerIcon from '@/assets/icons/icon-player.svg';
import shareIcon from '@/assets/icons/icon-share.svg';

const AnimePage: React.FC = () => {
  const rating = (id: string): string => {
    switch (id) {
      case '0':
        return 'G';
      case '1':
        return 'PG';
      case '2':
        return 'PG-13';
      case '3':
        return 'R';
      case '4':
        return 'R+';
      case '5':
        return 'Rx';
      default:
        return '';
    }
  };

  const onTrailerClick = (): void => {
    alert('on trailer click');
  };

  const onShareClick = (): void => {
    alert('on share click');
  };

  const onAddToListClick = (): void => {
    alert('on add to list click');
  };

  // const onAllCharactersClick = (): void => {
  //   alert('on all characters click');
  // };

  // const onCharacterClick = (): void => {
  //   alert('on character click');
  // };

  // const onSimilarClick = (): void => {
  //   alert('on similar click');
  // };

  const progressBar = (): void => {
    const progress = document.getElementsByClassName(
      style.scrollbar,
    ) as HTMLCollectionOf<HTMLElement>;
    const scrollElement = document.getElementsByClassName(
      style.secondcolumn,
    ) as HTMLCollectionOf<HTMLElement>;
    scrollProgressBar(progress[0], scrollElement[0]);
  };

  // const characters = () => {
  //   let mainChars = [];
  //   this.props.chars.forEach((element) => {
  //     if (this.props.anime.Characters[element.malid].position === 'Main') {
  //       mainChars.push(element);
  //     }
  //   });
  //   let chars = mainChars.map((element) => (
  //     <Tippy
  //       delay={[150, 0]}
  //       placement="top"
  //       content={<div className={style.tippy}>{element.name[0]}</div>}
  //     >
  //       <div className={style.charsElement}>
  //         <img src={element.image} alt="" />
  //       </div>
  //     </Tippy>
  //   ));
  //   return chars;
  // };
  // const similar = () => {
  //   let similarObject = this.props.similar.map((element) => (
  //     <NavLink to={'/anime/' + element.id}>
  //       <Tippy
  //         delay={[150, 0]}
  //         placement="top"
  //         content={<div className={style.tippy}>{element.Title}</div>}
  //       >
  //         <div
  //           className={style.similarElement}
  //           onClick={() => {
  //             this.openAnotherPage(element.id);
  //           }}
  //         >
  //           <img src={element.Poster} alt="" />
  //         </div>
  //       </Tippy>
  //     </NavLink>
  //   ));
  //   return similarObject;
  // };

  return (
    <div>
      <div className={style.scrollbar} />
      <div className={style.wrapper}>
        <div className={style.firscolumn}>
          <div className={style.poster}>
            <img
              src="https://cdn.myanimelist.net/images/anime/9/72689.jpg"
              alt="Poster"
            />
            <div className={style.posterDim}>
              <div className={style.shareButton} onClick={onShareClick}>
                <img src={shareIcon} alt="" />
              </div>
            </div>
          </div>
          <div>
            <div className={style.addToListButton} onClick={onAddToListClick}>
              <button>Add To List</button>
            </div>
          </div>
          <div>
            <div className={style.addToListButton}>
              <button>Franchise</button>
            </div>
          </div>
        </div>
        <div className={style.secondcolumn} onScroll={progressBar}>
          <div className={style.title}>{'Anime Title'}</div>
          <div className={style.synopsis}>
            <div className={style.synopsisContent}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
              saepe repellendus, eos aut nemo ducimus inventore a officiis omnis
              maxime totam animi quibusdam, nam veniam, praesentium eveniet
              aliquam cupiditate tempora. Et sequi voluptatibus a accusamus
              inventore perspiciatis distinctio cum provident sint, molestias
              saepe at quisquam libero quaerat repellendus iste exercitationem
              tenetur explicabo. Fugit, nemo. Iste sit alias deleniti quod
              sapiente. Quod nobis rerum quisquam asperiores ab labore eum qui
              magni non nam accusamus inventore iste neque quas illo consectetur
              illum numquam minus sunt dolore, aut sint, enim provident est?
              Quasi? Cumque illo cupiditate recusandae perspiciatis, maxime
              velit eveniet. Est in eveniet optio mollitia hic ipsam ut eum
              atque, nihil, earum reprehenderit delectus dicta. At
              necessitatibus vero quos. Suscipit, quod facere. Odio aliquid
              veritatis labore optio eaque alias, suscipit fugit temporibus
              quibusdam corrupti aut consectetur iste magni fuga ullam ut illum
              amet id eligendi dolore ducimus ad rem quos ex? Recusandae? Beatae
              possimus repellat tempore natus quaerat atque accusantium minus
              asperiores et, mollitia, ut voluptate velit. Repellendus ex omnis
              ipsa veniam eligendi molestias temporibus magnam illum, quidem
              mollitia magni voluptate quasi. Eligendi veritatis dignissimos
              eius fuga, doloribus molestiae eos qui, at rerum aperiam est eum
              quia perspiciatis in, esse iusto incidunt ipsum pariatur? Eaque
              laudantium praesentium quia blanditiis accusantium perspiciatis
              reprehenderit! Ullam, ut eos tenetur ipsum nulla perspiciatis
              dolor laborum mollitia vero, excepturi cum officiis repudiandae
              nesciunt dolorem earum iusto accusantium quo sint assumenda! Modi
              facilis numquam dolor magnam pariatur eum.
            </div>
          </div>
          <div className={style.characters}>
            <div className={style.charactersTitle}>Characters</div>
            <div className={style.charactersContentWrapper}>
              characters here
            </div>
          </div>
          <div className={style.similar}>
            <div className={style.charactersTitle}>Similar</div>
            <div className={style.similarContentWrapper}>
              <div className={style.similarContent}>Similar Anime Here</div>
            </div>
          </div>
          <div>
            <Posts />
          </div>
        </div>
        <div className={style.thirdcolumn}>
          <div className={style.stats}>
            <div className={style.statsLine}>
              <span>Score:</span> {'8.0'}
            </div>
            <div className={style.statsLine}>
              <span>Type:</span> {'Movie'}
            </div>
            <div className={style.statsLine}>
              <span>Status:</span> {'Airing'}
            </div>
            <div className={style.statsLine}>
              <span>Episodes:</span> {'1'}
            </div>
            <div className={style.statsLine}>
              <span>Aired:</span> {'aired'}
            </div>
            <div className={style.statsLine}>
              <span>Source:</span> {'manga'}
            </div>
            <div className={style.statsLine}>
              <span>Studio:</span> {'bones'}
            </div>
            <div className={style.statsLine}>
              <span>Duration:</span> {'23 min'}
            </div>
            <div className={style.statsLine}>
              <span>Rating:</span> {rating('0')}
            </div>
          </div>
          <div className={style.genresTitle}>Genres</div>
          <div className={style.genres}>Mecha, Sci-fi</div>
          <div className={style.trailer} id="trailer" onClick={onTrailerClick}>
            <img className={style.playIcon} src={playerIcon} alt="" />
            <img
              className={style.trailerPoster}
              src="https://cdn.myanimelist.net/images/anime/9/72689.jpg"
              alt="trailer"
              id="trailer"
            />
          </div>
        </div>
      </div>
      {/* <TrailerModal
        Trailer={this.props.anime.Trailer}
        onCloseClick={this.onTrailerClick}
      /> */}
      {/* {this.state.shareModal && (
        <ShareModal
          onCloseClick={this.onShareClick}
          anime={this.props.anime.id}
        />
      )} */}
    </div>
  );
};

export default AnimePage;
