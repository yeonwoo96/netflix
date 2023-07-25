import { styled } from "styled-components";
import { IgetMovies } from "../Api";
import { makeImagePath } from "../util";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SliderWrap = styled(motion.div)`
  position: relative;
  top: -200px;
`;
const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;
const Box = styled(motion.div)`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  box-sizing: border-box;
  bottom: 0;
  opacity: 0;
  width: 100%;
  position: absolute;
  background-color: ${(props) => props.theme.black.lighter};
  background: black;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const InfoVar = {
  hover: {
    opacity: 1,
  },
  initial: {
    opacity: 0,
  },
};
const rowVarinants = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};
const offset = 6;

const boxVar = {
  initial: { scale: 1 },
  hover: { scale: 1.4, transition: { y: -10, delay: 0.3 } },
};
const Btn = styled.button`
  position: absolute;
  width: 30px;
  height: 200px;
  background: rgba(0, 0, 0, 0.4);

  border: none;
  svg {
    fill: #fff;
    scale: 2;
  }
  &:hover {
    svg {
      scale: 3;
    }
  }
  &.right {
    right: 0;
  }
`;
const Slider = ({ data }: { data: IgetMovies }) => {
  console.log(data);
  const navigate = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      const totalMovies = data?.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totalMovies = data?.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <>
      <SliderWrap>
        <AnimatePresence
          initial={false}
          custom={back}
          onExitComplete={toggleLeaving}
        >
          {/* initial= false를 주면 처음 화면에 로딩될떄 initial 상태가 아님. onExitComplete는 exit가 끝난뒤 발동  */}
          <Row
            variants={rowVarinants}
            custom={back}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween" }}
            // type: spring이 기본값인데 tween으로 바꿔서 튕기는 효과를 없애줌
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  variants={boxVar}
                  layoutId={`${movie.id}`}
                  onClick={() => onBoxClicked(movie.id)}
                  whileHover="hover"
                  initial="initial"
                  key={movie.id}
                >
                  <img src={makeImagePath(movie.backdrop_path, "w500")} />
                  <Info variants={InfoVar}>
                    <h4>{movie.title}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
        <Btn onClick={decreaseIndex} className="left">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
          </svg>
        </Btn>
        <Btn onClick={increaseIndex} className="right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 320 512"
          >
            <path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
          </svg>
        </Btn>
      </SliderWrap>
    </>
  );
};

export default Slider;
