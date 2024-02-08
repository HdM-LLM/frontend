import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, LinearProgress, Typography } from '@mui/material';
import { Rating } from '../types/rating';
import { Category } from '../types/category';
import API from '../api/api';
import { useEffect, useState } from 'react';

/**
 * StyledTableCell component applying custom styles to table cell headers and bodies.
 */
const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FFFFFF',
    color: '#4d4d4d',
    fontSize: 20,
    border: 5,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    border: 5,
  },
}));

/**
 * StyledTableRow component applying custom styles to table rows, including alternating row colors and hiding the last border.
 */
const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f3f3f3',
    boxShadow: 0,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    boxShadow: 0,
  },
}));

type ApplicantDetailsTableProps = {
  applicantRatings: Rating[];
};

type ExtRating = Rating & {
  categoryName: string;
};

/**
 * Displays a table of applicant ratings along with category names.
 * @param {ApplicantDetailsTableProps} props - Component props containing applicant ratings.
 */
export default function ApplicantDetailsTable(props: ApplicantDetailsTableProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ratings, setRatings] = useState<ExtRating[]>([]);

  /**
   * Fetches category data for each rating and updates the categories state.
   */
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const api = API.getAPI();
        let categoryList: Category[] = [];
        for (const rating of props.applicantRatings) {
          const categoryData = await api.fetchCategoryData(rating.categoryId);
          categoryList.push(categoryData);
        }
        setCategories(categoryList);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchCategoryData();
  }, [props.applicantRatings]);

  /**
   * Updates the ratings state with the category names included.
   */
  useEffect(() => {
    if (props.applicantRatings.length !== categories.length) {
      return;
    }

    let ratingList: ExtRating[] = [];
    props.applicantRatings.forEach((rating) => {
      const category = categories.find((category) => category.id === rating.categoryId);
      if (category) {
        ratingList.push({ ...rating, categoryName: category.name });
      }
    });
    setRatings(ratingList);
  }, [categories, props.applicantRatings]);

  const maxProgressBarValue = 10;

  /**
   * Checks if the quote starts with a bullet point and removes it if it does
   * @param {string} quote - The quote to check for bullet points
   * @returns {string} - The quote without bullet points
   */
  const checkQuoteForBulletPoints = (quote: string) => {
    if (quote.startsWith('\u2022')) {
      // Quote can contain multiple sentences, so we need to split it
      const sentences = quote.split('.');
      // Remove the first two elements of each sentence (the bullet point and the space after it)
      const newSentences = sentences.map((sentence) => sentence.slice(2));
      // Join the sentences back together
      quote = newSentences.join('. ');
    }
    return quote;
  };

  /**
   * Renders a placeholder text when no quote is available.
   * @param {string} quote - The quote to check for availability.
   * @returns {JSX.Element} A Typography component displaying "No quote available".
   */
  const noQuoteAvailable = (quote: string) => {
    return (
      <Typography sx={{ color: '#4d4d4d', fontStyle: 'italic' }}>No quote available</Typography>
    );
  };

  return (
    <TableContainer
      sx={{
        flexDirection: 'row',
        borderRadius: 2,
        marginTop: 3,
        marginBottom: 3,
        maxWidth: '100%',
      }}
    >
      <Table aria-label="table with skills and their rating" size="medium">
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ paddingRight: 15 }}>Category</StyledTableCell>
            <StyledTableCell sx={{ paddingRight: 15 }}>Rating</StyledTableCell>
            <StyledTableCell>Justification</StyledTableCell>
            <StyledTableCell>Quote</StyledTableCell>
            <StyledTableCell>Weight</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ratings.map((rating) => (
            <StyledTableRow key={rating.id}>
              <StyledTableCell component="th" scope="row">
                {rating.categoryName}
              </StyledTableCell>
              <StyledTableCell align="center">
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LinearProgress
                    variant="determinate"
                    value={(rating.score / maxProgressBarValue) * 100}
                    color="secondary"
                    sx={{
                      height: 5,
                      borderRadius: 5,
                      minWidth: '85%',
                      marginRight: 2,
                    }}
                  ></LinearProgress>
                  {rating.score}/10
                </Box>
              </StyledTableCell>
              <StyledTableCell>{rating.justification}</StyledTableCell>
              <StyledTableCell>
                {rating.quote.includes('No quote available')
                  ? noQuoteAvailable(rating.quote)
                  : rating.quote}
              </StyledTableCell>
              <StyledTableCell align="center">{rating.weight}%</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
