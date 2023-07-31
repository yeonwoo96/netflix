// import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { useQuery } from "react-query";
import { DetailMovies, IgetMovies, popularMovies } from "../Api";
import { makeImagePath } from "../util";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background: black;
  overflow-x: hidden;
`;

const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgphoto});
  background-size: cover;
`;
const Title = styled(motion.h2)`
  display: inline-block;
  font-size: 68px;
  margin-bottom: 23px;
`;
const Overview = styled.p`
  font-size: 23px;
  width: 50%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;
const MovieDetail = styled(motion.div)`
  position: absolute;
  width: 500px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;
const DetailCover = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
`;
const DetailTextBox = styled.div`
  padding: 30px;
  display: grid;
  grid-template-columns: 2fr 1fr;
`;
const DetailTitle = styled.h3`
  font-size: 28px;
  position: relative;
  top: -50px;
`;
const DetailAverage = styled.p`
  color: #46d369;
`;
const DetailDate = styled.p``;
const DetailOverview = styled.p`
  font-size: 14px;
  margin-top: 20px;
`;
const BtnWrap = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 32px;
`;
const Btn = styled.button`
  border: none;
  padding: 12px 36px;
  display: flex;
  font-size: 24px;
  border-radius: 10px;
  align-items: center;
  gap: 10px;
  svg {
    scale: 1.3;
  }
  &:nth-child(2) {
    background-color: rgba(109, 109, 110, 0.4);
    color: #fff;
  }
`;

const Popular = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  const { data: toprated, isLoading: Loading3 } = useQuery<IgetMovies>(
    ["movies", "toprated"],
    popularMovies
  );

  const navigate = useNavigate();
  const OverlayClick = () => navigate("");
  const Match = useMatch("/popular/movie/:movieId");
  console.log(Match);
  const param = Match?.params.movieId;
  const Id = Match?.params.movieId?.split("_")[0];
  const clickedMovieArr =
    Match?.params.movieId &&
    [toprated?.results.find((movie) => String(movie.id) === Id)].filter(
      (prev) => prev != undefined
    );
  const clickedMovie: string | DetailMovies | undefined = clickedMovieArr?.[0];
  const { scrollY } = useScroll();
  typeof clickedMovie;
  return (
    <Wrapper>
      {Loading3 ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgphoto={makeImagePath(toprated?.results[5].backdrop_path || "")}
          >
            <Title
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {toprated?.results[5].title}
            </Title>
            <Overview>{toprated?.results[5].overview}</Overview>
            <BtnWrap>
              <Btn>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ltr-0 e1mhci4z1"
                  data-name="Play"
                  aria-hidden="true"
                >
                  <path
                    d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z"
                    fill="currentColor"
                  ></path>
                </svg>
                재생
              </Btn>
              <Btn>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ltr-0 e1mhci4z1"
                  data-name="CircleI"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z"
                    fill="currentColor"
                  ></path>
                </svg>
                상세 정보
              </Btn>
            </BtnWrap>
          </Banner>

          <Slider
            data={toprated!}
            category="toprated"
            title="넷플릭스 인기 콘텐츠
            "
          />

          <AnimatePresence>
            {Id && (
              <>
                <Overlay onClick={OverlayClick} exit={{ opacity: 0 }} />
                <MovieDetail
                  layoutId={param}
                  key={Id}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {typeof clickedMovie == "object" && (
                    <>
                      <DetailCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <DetailTextBox>
                        <div className="left">
                          {" "}
                          <DetailTitle>{clickedMovie.title}</DetailTitle>
                          <DetailOverview>
                            {clickedMovie.overview}
                          </DetailOverview>
                        </div>
                        <div className="right">
                          <DetailAverage>
                            평점 {clickedMovie.vote_average}
                          </DetailAverage>
                          <DetailDate>
                            개봉일 {clickedMovie.release_date}
                          </DetailDate>
                        </div>
                      </DetailTextBox>
                    </>
                  )}
                </MovieDetail>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Popular;
