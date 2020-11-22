import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_QUESTIONS } from '../graphql/queries';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useStateContext } from '../context/state';
import { useAuthContext } from '../context/auth';
import SortQuesBar from '../components/SortQuesBar';
import QuesCard from '../components/QuesCard';
import AuthFormModal from '../components/AuthFormModal';
import LoadMoreButton from '../components/LoadMoreButton';
import { filterDuplicates } from '../utils/helperFuncs';

import { Typography, Button, Divider, useMediaQuery } from '@material-ui/core';
import { useQuesListStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';

const QuesListPage = ({ tagFilterActive, searchFilterActive }) => {
  const [fetchQuestions, { data, loading }] = useLazyQuery(GET_QUESTIONS, {
    fetchPolicy: 'network-only',
    onError: (err) => {
      console.log(err.graphQLErrors[0].message);
    },
  });

  const { tagName, query } = useParams();
  const { clearEdit } = useStateContext();
  const { user } = useAuthContext();
  const [quesData, setQuesData] = useState(null);
  const [sortBy, setSortBy] = useState('HOT');
  const [page, setPage] = useState(1);
  const classes = useQuesListStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const getQues = (sortBy, page, limit, filterByTag, filterBySearch) => {
    fetchQuestions({
      variables: { sortBy, page, limit, filterByTag, filterBySearch },
    });
  };

  useEffect(() => {
    getQues(sortBy, 1, 12, tagName, query);
    setPage(1);
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, tagName, query]);

  useEffect(() => {
    if (data && page === 1) {
      setQuesData(data.getQuestions);
    }

    if (data && page !== 1) {
      setQuesData((prevState) => ({
        ...data.getQuestions,
        questions: prevState.questions.concat(
          filterDuplicates(prevState.questions, data.getQuestions.questions)
        ),
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleLoadPosts = () => {
    getQues(sortBy, page + 1, 12, tagName, query);
    setPage(page + 1);
  };

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <Typography variant={isMobile ? 'h6' : 'h5'} color="secondary">
          {tagFilterActive
            ? `Questions tagged [${tagName}]`
            : searchFilterActive
            ? `Search results for "${query}"`
            : 'All Questions'}
        </Typography>
        {user ? (
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? 'small' : 'medium'}
            component={RouterLink}
            to="/ask"
            onClick={() => clearEdit()}
            style={{ minWidth: '9em' }}
          >
            Ask Question
          </Button>
        ) : (
          <AuthFormModal buttonType="ask" />
        )}
      </div>
      <SortQuesBar isMobile={isMobile} sortBy={sortBy} setSortBy={setSortBy} />
      <Divider />
      {loading && page === 1 && <div>loading...</div>}
      {quesData &&
        (quesData.questions.length !== 0 ? (
          quesData.questions.map((q) => <QuesCard key={q.id} question={q} />)
        ) : (
          <Typography
            color="secondary"
            variant="h6"
            className={classes.noQuesText}
          >
            {tagFilterActive
              ? `There are no questions tagged "${tagName}".`
              : searchFilterActive
              ? `No matches found for your search "${query}".`
              : 'No questions found.'}
          </Typography>
        ))}
      {quesData && quesData.next && (
        <LoadMoreButton
          loading={page !== 1 && loading}
          handleLoadPosts={handleLoadPosts}
        />
      )}
    </div>
  );
};

export default QuesListPage;
