import like from '../lib/icons/like.png'
import dislike from '../lib/icons/dislike.png'
import Image from 'next/image'
import {db} from '../lib/firebase'
import { collection, addDoc } from "firebase/firestore"; 
import { store } from '../pages';
import firebase from 'firebase/compat/app'

const Thumbs = (props:{store:store}) => {
  const { store: [state, setState] } = props
  const { prompt, SQL } = state

  const thumbUp = async () => {
    try {
      const docRef = await addDoc(collection(db, "queries"), {
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        prompt: prompt,
        query: SQL,
        thumb: true
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const thumbDown = async () => {
    console.log('thumb down')
  }

    return (<div>
        <Image src={like} alt='like' className='w-6 cursor-pointer inline-block' onClick={thumbUp} />
        <Image src={dislike} alt='dislike' className='w-6 cursor-pointer inline-block' onClick={thumbDown} />
    </div>)
  }
  
  export default Thumbs