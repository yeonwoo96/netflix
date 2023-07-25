// import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { useQuery } from "react-query";
import { IgetMovies, getMovies } from "../Api";
import { makeImagePath } from "../util";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background: black;
  height: 200vh;
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
const Title = styled.h2`
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
  width: 600px;
  height: 600px;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;
const DetailCover = styled.div`
  width: 100%;
  height: 250px;
  background-size: cover;
`;
const DetailTitle = styled.h3`
  text-align: center;
  font-size: 28px;
`;
const DetailOverview = styled.p`
  font-size: 14px;
  margin-top: 20px;
  text-align: center;
`;
const Home = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading } = useQuery<IgetMovies>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const navigate = useNavigate();
  const OverlayClick = () => navigate("");
  const Match = useMatch("/movie/:movieId");
  const clickedMovie =
    Match?.params.movieId &&
    data?.results.find((movie) => String(movie.id) === Match.params.movieId);
  console.log(clickedMovie);
  const Id = Match?.params.movieId;
  const { scrollY } = useScroll();
  //

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider data={data!} />
          <AnimatePresence>
            {Id && (
              <>
                <Overlay onClick={OverlayClick} exit={{ opacity: 0 }} />
                <MovieDetail
                  layoutId={Id}
                  key={Id}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickedMovie && (
                    <>
                      <DetailCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <DetailTitle>{clickedMovie.title}</DetailTitle>
                      <DetailOverview>{clickedMovie.overview}</DetailOverview>
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

export default Home;
