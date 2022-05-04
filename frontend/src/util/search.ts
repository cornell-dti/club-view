import express from 'express';
import { ClubType } from '../../../backend/types/types';
import { db } from '../../../backend/firebase-config/config';

const clubsCollection = db.collection('clubs');

/* Levenshtein's algorithm to calculate difference between two strings 
    queryString: string provided by user in search bar
    clubName: names of the clubs
    if the distance between the queryString and clubName is too large, return "No clubs matched your search"
    This will return a set (clubType, distance) */
const distanceBetweenStrings = (queryString, clubNames) => {
  // base cases
  if (queryString.length == 0) return clubNames.length; // by default dropdown menu will show 4 shortest clubs
  if (clubNames.length == 0) return queryString.length;

  // creating the comparative matrix
  const compMatrix = [];

  for (let i = 0; i <= clubNames.length; i++) {
    compMatrix[i] = [i];
  }

  for (let j = 0; j <= queryString.length; j++) {
    compMatrix[0][j] = j;
  }

  /* 
    the logic to fill in the rest of the matrix !!! 
    the row of the matrix is the query word that user input and the column of the matrix is every clubs name
    We check the crossection of the two words. 
    If the crossection of the two words are the same, we carry the value from the previous entry. 
    If the crossection of two words are different, we can insert, delete, or substitute. Whichever method results in the
    shortest distance will be the distance set at that location of the comparative matrix
    */

  for (let i = 1; i <= clubNames.length; i++) {
    for (let j = 1; j <= clubNames.length; j++) {
      // if the crossectional characters are equal, we take the value from upper left diagonal and set it to current pos
      if (queryString.charAt(i) === clubNames.charAt(j)) {
        compMatrix[i - 1][j - 1] = compMatrix[i][j];
      } else {
        // take the minimum distance from performing a letter substitution, insertion, deletion
        compMatrix[i][j] = Math.min(
          compMatrix[i - 1][j - 1] + 1, // substitution: add one letter (allows for typos)
          Math.min(
            compMatrix[i][j - 1] + 1, // checks to see if shifting user word one spot right of matrix results in smaller distance
            compMatrix[i - 1][j] + 1 // checks to see if deleting a character results in smaller distance
          )
        );
      }
    }
  }
  // since this algorithm increments position of matrix whenever it has to substitute, insert, or delete, we return the last entry of matrix
  return compMatrix[clubNames.length][queryString];
};

const minimumDistances = (queryString) => {
  // TODO: return a list of four clubTypes that have the least Levenshtein's Distance
};

export { minimumDistances };
