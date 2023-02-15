import like from '../lib/icons/like.png'
import likeActive from '../lib/icons/likeActive.png'
import dislike from '../lib/icons/dislike.png'
import dislikeActive from '../lib/icons/dislikeActive.png'
import Image from 'next/image'
import { db } from '../lib/firebase'
import { collection, addDoc } from "firebase/firestore";
import { store } from '../pages/query';
import firebase from 'firebase/compat/app'

const Thumbs = (props: { store: store }) => {
  const { store: [state, setState] } = props
  const { prompt, SQL, thumbs } = state
  /* 
  this is a tricky feature:
  if you haven't hit any thumbs, a thumb up will send doc and color in a thumb up
                                a thumb down will send doc and color in a thumb down
  if you have hit thumbs up, 
            and you hit thumbs down, 
                    it will change the state from thumbs up to thumbs down and send doc
            and you hit a thumbs up, 
                    it will change state to null (not send doc!)


  
  */

  const addThumb = async (isThumbUp: boolean, thumb = thumbs) => {
    // if thumbs are neutral (no thumb up or down)
    if (thumb == null) {
      setState(ps => ({ ...ps, thumbs: isThumbUp ? "up" : "down" }))
      try {
        const docRef = await addDoc(collection(db, "queries"), {
          date: Date.now(),
          prompt: prompt,
          query: SQL,
          thumb: isThumbUp
        });
        console.log("Document written with ID: ", docRef.id);

      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    // if thumbs are up and you hit up || thumbs are down and you hit down
    else if ((thumb == "up" && isThumbUp) || (thumb == "down" && !isThumbUp)) {
      setState(ps => ({ ...ps, thumbs: null }))
    } // else thumbs are up and you hit down OR thumbs are down and you hit up
    else {
      setState(ps => ({ ...ps, thumbs: null }))
      addThumb(isThumbUp, null)
    }
  }



  return (<div>
    <Image src={thumbs == "up" ? likeActive : like} alt='like' className='w-6 cursor-pointer inline-block' onClick={() => addThumb(true)} />
    <Image src={thumbs == "down" ? dislikeActive : dislike} alt='dislike' className='w-6 cursor-pointer inline-block' onClick={() => addThumb(false)} />
  </div>)
}

export default Thumbs