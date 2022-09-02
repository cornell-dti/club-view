import { ClubType, StudentType, EventType } from "../constants/types";
import { firestore } from "firebase-admin";

/** getDataFromReference takes in a reference to a place in our database along with the type of data we want this to return and finds and returns its document */
const getPromisedDataFromReference = async (
    reference: firestore.DocumentReference,
    dataType: string
) => {
    const dataPromise = await reference.get();
    let promisedDataFromReference;
    switch (dataType) {
        case "ClubType": {
            promisedDataFromReference = dataPromise.data() as ClubType;
            break;
        }
        case "EventType": {
            promisedDataFromReference = dataPromise.data() as EventType;
            break;
        }
        case "StudentType": {
            promisedDataFromReference = dataPromise.data() as StudentType;
            break;
        }
        default: {
            throw "Not a valid data type";
        }
    }
    return promisedDataFromReference;
};

/** getDataFromPromises returns a list of data corresponding to typeOfField.*/
const getDataFromPromises = async (
    firebaseDocument: FirebaseFirestore.DocumentData,
    referenceField: string,
    typeOfField: string
) => {
    const referenceList: firestore.DocumentReference[] =
        firebaseDocument[referenceField];

    const promisedReferenceList = referenceList.map((reference) => {
        return getPromisedDataFromReference(reference, typeOfField);
    });

    const dataList = await Promise.all(promisedReferenceList).then((data) => {
        return data;
    });

    return dataList;
};

export { getPromisedDataFromReference, getDataFromPromises };
