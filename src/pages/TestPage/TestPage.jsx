import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useBreakpoints from "../../shared/hooks/useBreakpoints";
import getLocalResults from "../../redux/questions/localResults/localResults-selectors";
import { setResults } from "../../redux/questions/remoteResults/remoteResults-operations";
import {
  // fetchQuestions,
  fetchRandomQuestions,
  postResults,
} from "../../shared/api/questions-api";
import countRightsWrongs from "../../helpers/countRightsWrongs";
import {
  addResult,
  removeResults,
} from "../../redux/questions/localResults/localResults-actions";
import Container from "../../shared/components/Container";
import ButtonUniversal from "../../shared/components/ButtonUniversal/ButtonUniversal";
import TestHeader from "../../modules/TestHeader";
import Question from "../../modules/Question";
import TestCtrlButtons from "../../modules/TestCtrlButtons";
import Spinner from "../../shared/components/Spinner";
import styles from "./testPage.module.scss";

const initialState = {
  loading: false,
  error: null,
  questions: [],
};

const TestPage = () => {
  const [state, setState] = useState(initialState);
  const [searchParams, setSearchParams] = useSearchParams();

  const { questions, loading, error } = state;
  const { kind } = useParams();
  const questionId = searchParams.get("questionId");
  const numericQuestionId = Number(questionId);
  const results = useSelector(getLocalResults);

  useEffect(() => {
    const getQuestions = async (kind) => {
      const id = questionId || "1";
      setSearchParams({ questionId: id });
      setState((prevState) => ({ ...prevState, error: null, loading: true }));
      try {
        // const questions = await fetchQuestions(kind);
        const questions = await fetchRandomQuestions(kind);
        setState((prevState) => ({
          ...prevState,
          questions,
          loading: false,
        }));
      } catch (error) {
        setState((prevState) => ({
          ...prevState,
          error: error.message,
          loading: false,
        }));
      }
    };
    getQuestions(kind);
  }, [kind]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalQuestions = questions.length;
  const { bigger768px } = useBreakpoints();
  const prevText = bigger768px ? "Previous question" : "";
  const nextText = bigger768px ? "Next question" : "";

  const interruptTest = useCallback(() => {
    dispatch(removeResults());
    localStorage.removeItem("answers");
    navigate("/");
  }, [dispatch, navigate]);

  const finishTest = async () => {
    const resultsCount = countRightsWrongs(questions, results);
    const reqBody = { kind, results: resultsCount };
    await postResults(reqBody);
    localStorage.removeItem("answers");
    dispatch(removeResults());
    await dispatch(setResults(kind));
    navigate(`/diagram/${kind}`);
  };

  const currentQuestion = questions.find(
    (question) => question.questionId === questionId
  );

  const changeId = useCallback(
    (direction) => {
      const newId =
        direction === "forward" ? numericQuestionId + 1 : numericQuestionId - 1;
      setSearchParams({ questionId: newId });
    },
    [numericQuestionId, setSearchParams]
  );

  const setVariant = ({ question, answer }) => {
    dispatch(addResult({ question, answer }));
  };

  return (
    <div className={styles.main}>
      <Container>
        {loading && <Spinner />}
        {loading && !questions.length && (
          <div className={styles.skeleton}></div>
        )}
        {error && <h2 className={styles.error}>{error}</h2>}
        {!error && (
          <>
            <TestHeader
              kind={kind}
              buttonText="Finish test"
              onClick={interruptTest}
            />
            {questions.length > 0 && (
              <Question
                item={currentQuestion}
                total={totalQuestions}
                onChange={setVariant}
              />
            )}
            <TestCtrlButtons
              questionId={questionId}
              total={totalQuestions}
              prevText={prevText}
              nextText={nextText}
              onClick={changeId}
            >
              {results.length === totalQuestions &&
                numericQuestionId === totalQuestions && (
                  <ButtonUniversal
                    type="button"
                    text="See results"
                    btnStyles={styles.result}
                    onClick={finishTest}
                  />
                )}
            </TestCtrlButtons>
          </>
        )}
      </Container>
    </div>
  );
};

export default TestPage;
