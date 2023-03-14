import { Dispatch, SetStateAction, useEffect, useState, useImperativeHandle, forwardRef } from 'react'
import Image from 'next/image'
import Enter from './../../statics/img/Enter.png'
import Loading from './../../statics/img/loading.gif'
import ChartDefault from './../../statics/img/chart-default.svg'
import ChartHover from './../../statics/img/chart-hover.svg'
import DownloadDefault from './../../statics/img/download-default.svg'
import downloadHover from './../../statics/img/download-hover.svg'
import UploadDefault from './../../statics/img/supload.svg'
import Commesdf from './../../statics/img/card-comment.png'
import Mirror from './../../statics/img/mirror.png'
import Like from './../../statics/img/like.png'
import Collect from './../../statics/img/collect.png'
import LensImg from './../../statics/img/lest-head.png'
import PostBg from './../../statics/img/post-bg.png'

import Close from './../../statics/img/close-wi.png'
import Bar from './Bar'
import Line from './Line'
import { canShowPublications, insertLineBreaks } from '../../lib/helpers'
import Table from '../Table'
import examples from '../../lib/examples.json'
import { useAppState, useConnectWallet } from '@web3-onboard/react'
import User from './lens/User'
import Post from './lens/Post'
import Publications from './lens/Publications'

let DatabasePage2 = (props, ref) => {
  const [{ wallet }, ,] = useConnectWallet()

  const [showIcon, setShowIcon] = useState<any>([false, false, false])

  const [showSmartContractTip, setShowSmartContractTip] = useState<boolean>(false)

  const [showNotConnectTip, setShowNotConnectTip] = useState<boolean>(false)

  const [saving, setSaving] = useState<boolean>(false)

  const [showChart, setShowChart] = useState(0)

  const [{ promptText, isSqlLoading, isResultLoading, SQL, results }, setState] = props.store

  const [controllers, setControllers] = useState<AbortController[] | []>([])
  // const controller = new AbortController();
  // const signal = controller.signal;
  const handleClear = () => {
    for (let controller of controllers) controller.abort()
    props.clearState()
  }

  const getResults = async (SQL: string) => {
    // comment back in later
    // if(!wallet) { 
    //   setShowNotConnectTip(true)
    //   return
    // }
    if (!SQL) return // in case someone hits run but there's nothing there
    setState(ps => ({ ...ps, results: [], isResultLoading: true }))
    const controller = new AbortController()
    setControllers(pc => [...pc, controller])
    // handle SQL
    let resp = await fetch('/api/lensRead', {
      method: "POST",
      body: JSON.stringify({ SQL }),
      signal: controller.signal
    })
    let response = await resp.json()
    if (resp.status != 200) return console.error('error', response)
    console.log('SQL resp', response)
    const results: Array<any> = response?.results
    // setResults(results)
    setState(ps => ({ ...ps, results: results, isResultLoading: false }))
  }

  const handleRun = async (prompt = promptText) => {
    console.log(`running!`, prompt, isSqlLoading)
    if (!prompt || isSqlLoading) return
    setState(pS => ({ ...pS, SQL: '', isSqlLoading: true }))
    console.log('fetching with prompt:', prompt)
    const controller = new AbortController()
    setControllers(pc => [...pc, controller])
    let resp = await fetch('/api/genSQL', {
      method: "POST",
      body: JSON.stringify({ prompt: prompt }),
      signal: controller.signal
    })
    if (resp.status != 200) return console.error('error', resp)
    let response = await resp.json()
    console.log(response)
    //post-API call processing
    const SQL = insertLineBreaks("SELECT " + response.data)
    console.log(SQL)
    setState(pS => ({ ...pS, SQL: SQL, isSqlLoading: false, isResultLoading: true }))

    //handle SQL
    await getResults(SQL)

    // let ad = [{ "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5868, "content_URI": "https://arweave.net/WIfKtiV0eCVWgUvTuSwJTv9yLzCjfIFvfy_o8a3exFg", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-02-26T00:21:02.000Z", "type": "Post", "comment_count": 414, "mirror_count": 916, "content": "Say my name, say my name\nIf no one is around you\nSay baby I love you\nIf you ain't runnin' game\nSay my name, say my name\nYou actin' kinda shady\nAin't callin' me baby\nWhy the sudden change\nSay gho, say my gho gho\nIf no one is around you\nSay baby I love gho you\nIf you ain't runnin' game\nSay my name, say my name\nYou actin' kinda shady\nAin't callin' me baby\nBetter say gho o ghooo", "image": null, "imageMimeType": null }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 6098, "content_URI": "https://arweave.net/9OCg4w2hMVFLkBj-nvX8CNouGt4jGWctVFHUiMqsub4", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-03-07T01:35:55.000Z", "type": "Post", "comment_count": 394, "mirror_count": 1160, "content": null, "image": null, "imageMimeType": null }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5695, "content_URI": "ar://7RAlI2btUa2HEpCcZ10WkCOnW9JPt0lbHDJpiMOOuO0", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-02-20T22:29:00.000Z", "type": "Post", "comment_count": 362, "mirror_count": 297, "content": null, "image": null, "imageMimeType": null }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5625, "content_URI": "https://arweave.net/IsxHRcTcaCpAesKZt1gvZxXN_xs_UHAb3V0ocBtB3JU", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-02-18T01:23:46.000Z", "type": "Post", "comment_count": 354, "mirror_count": 502, "content": "Follow me, I follow back is not good for health, never was", "image": null, "imageMimeType": null }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5965, "content_URI": "https://arweave.net/10YaENeRO9T029K6YKVrIDXZy6FHSr97eX-72vs3cBk", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-03-01T02:47:05.000Z", "type": "Post", "comment_count": 353, "mirror_count": 915, "content": "Finally have my Lens profile on my Apple Wallet 👌", "image": null, "imageMimeType": null }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 6065, "content_URI": "https://arweave.net/YpPPyycjZvbs-_67_tSTKScuz0-lmeH438Mp56AZVvY", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-03-05T06:54:37.000Z", "type": "Post", "comment_count": 349, "mirror_count": 710, "content": "Are we all the future?", "image": null, "imageMimeType": null }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 6066, "content_URI": "https://arweave.net/mC5ZvJjEkItFjtUaXhl5DtOdCQqUfIjbAuos9jXB-Ys", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-03-05T16:00:48.000Z", "type": "Post", "comment_count": 316, "mirror_count": 862, "content": "Wow the bird app suspended ETHDenver’s account, but no worries the vibes will continue here on Orb", "image": "ipfs://QmUv7kPi8kYJfVtR6BmJoaAzZdsdaVZWSoyNKTxqLRLrr9", "imageMimeType": "image/jpeg" }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5705, "content_URI": "ar://G8AtqUnoi6KfI0Heo5ukDwgvWRV2co-xYhI-pf-nz3Y", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-02-21T11:06:19.000Z", "type": "Post", "comment_count": 311, "mirror_count": 786, "content": null, "image": null, "imageMimeType": null }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5615, "content_URI": "https://arweave.net/6RLoH_tnYI6UaKXkl6XueZpB_2rutlRbAhpj73SKxyc", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-02-17T17:07:06.000Z", "type": "Post", "comment_count": 280, "mirror_count": 227, "content": "Happy Friday, say it back 💚", "image": null, "imageMimeType": null }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5702, "content_URI": "https://arweave.net/9NzcSh55MYQijfx6jJNvRDBWUOV32aPdhuCffHyaj5U", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-02-21T02:02:20.000Z", "type": "Post", "comment_count": 278, "mirror_count": 821, "content": "Love this engagement ux from Orb", "image": "ipfs://QmfAetSF45eESGYrv1nLgCoZkuWCkdTZ7BHPVA88iQd9nU", "imageMimeType": "image/jpeg" }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5667, "content_URI": "https://arweave.net/IfKKr11BLiA-0Dh1X4FeKVTYMQPxtEX1K4PpLnNBpUk", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-02-19T15:22:11.000Z", "type": "Post", "comment_count": 273, "mirror_count": 537, "content": "Spring deployed in Hyde Park London", "image": "ipfs://QmQqttuXtdV2QaxBAvJqqEVseXcsm2TBm8uHEGQjxCS8Ws", "imageMimeType": "image/jpeg" }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 6037, "content_URI": "https://arweave.net/qMvJhJrFT9NQ_SLj3V8cZ_lY5jWPIywmzVQGGbp51QY", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-03-04T03:59:57.000Z", "type": "Post", "comment_count": 252, "mirror_count": 882, "content": "We have a special guest at ETHDenver 👀@vitalik.lens", "image": "ipfs://QmTpTGUa6gF7Kki9hMbMgvUapHyepvvcLSztyuRWxBftnz", "imageMimeType": "image/jpeg" }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5924, "content_URI": "https://arweave.net/68SyTthF9rsgmTkMlHI-rfoUFBagPrb1cK9jU5XGglE", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-02-27T22:34:28.000Z", "type": "Post", "comment_count": 252, "mirror_count": 551, "content": "Denver has some sick street art", "image": "ipfs://QmXzGaiUpL6k8Hi7t2B6cqPux9cTeWLJhtNwU6ENyRrDWi", "imageMimeType": "image/jpeg" }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5666, "content_URI": "https://arweave.net/i38_WUfXtZ03TQCD4SIfL1vl0h2Ckegmqk24_BgjJKA", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-02-19T11:10:31.000Z", "type": "Post", "comment_count": 250, "mirror_count": 451, "content": "We have another gigabrain @bneiluj.lens on Lens now, give a big welcome 🌿👋🏻", "image": null, "imageMimeType": "image/svg+xml" }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5664, "content_URI": "https://arweave.net/4z1WFVW4f-dedZGUcZ-1FGiFE7W_XI-snQ0jeaLCTWU", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-02-19T00:43:32.000Z", "type": "Post", "comment_count": 249, "mirror_count": 626, "content": "Whats the point of websites like Forbes where ads take half of the readers screen, multiple popups from data consent to subcription popups and glitchy scrolling due to loading video ads? No wonder internet feels broken.", "image": null, "imageMimeType": "image/svg+xml" }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5968, "content_URI": "https://arweave.net/DsCZfdllygpGc33WztzirXT3ZygagchalECeOoD1n_Q", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-03-01T03:49:37.000Z", "type": "Post", "comment_count": 248, "mirror_count": 544, "content": "We need more gamers into Lens, urgent need to know latest exciting games", "image": null, "imageMimeType": null }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 6122, "content_URI": "https://arweave.net/FLq36CzzwSdNo3POcv5GsvtyX4rtJM17G5UH6uOFX-g", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-03-07T20:27:05.000Z", "type": "Post", "comment_count": 247, "mirror_count": 580, "content": null, "image": null, "imageMimeType": null }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 6124, "content_URI": "https://arweave.net/ZcYdq1CE6YSSkqPXcRunEdsJzf30VYRSTWhG7Bb1P9c", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-03-08T02:29:52.000Z", "type": "Post", "comment_count": 236, "mirror_count": 687, "content": null, "image": null, "imageMimeType": null }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 6006, "content_URI": "https://arweave.net/F3o9CSGXn0oqDM66yogtsgEdAJHoVqe7OZ0uWciCEbc", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-03-03T00:03:10.000Z", "type": "Post", "comment_count": 229, "mirror_count": 719, "content": "vibes", "image": "ipfs://QmQHzH48jc4Lt9cKBh1V6aKcSTEj7shHQYUoLv1G89qf6m", "imageMimeType": "image/jpeg" }, { "user_id": 5, "address": "0x7241dddec3a6af367882eaf9651b87e1c7549dff", "user_name": "stani", "in_reply_to_user_id": null, "in_reply_to_post_id": null, "post_id": 5987, "content_URI": "https://arweave.net/lvy8B-E0YYB1NCO5yfusB6-tHqxeAgYlwZ5OPlVgbSA", "in_reply_to_address": null, "in_reply_to_user_name": null, "timestamp": "2023-03-01T16:07:11.000Z", "type": "Post", "comment_count": 228, "mirror_count": 806, "content": "Some exciting algos would love to see is bot detection, reputation score, image search, content recommendations, collect recommendations, who to follow by using follow graphs, content text and tags 👀\n\n___\nQuoting @lensprotocol :\nLens BigQuery Public Dataset is Live 🔍\n\nRead more about unlocking new possibilities in our blog\nhttps://mirror.xyz/lensprotocol.eth/L-VyE549sOOdi4nBgos6XNAUgf3H1oErfkAtndU6RHY\n\nLearn how it works in  ...", "image": null, "imageMimeType": null }]
    // let ad = [{"user_name":"femboy","count":19625},{"user_name":"fortunetrees","count":15622},{"user_name":"billym2k","count":15419},{"user_name":"0xzelda","count":14601},{"user_name":"gotenks","count":9945}]
    // let ad = [{"day":1,"posts":9,"comments":16,"mirrors":10},{"day":2,"posts":4,"comments":5,"mirrors":2},{"day":3,"posts":10,"comments":9,"mirrors":7},{"day":4,"posts":7,"comments":13,"mirrors":6},{"day":5,"posts":7,"comments":10,"mirrors":6},{"day":6,"posts":1,"comments":8,"mirrors":9},{"day":7,"posts":4,"comments":8,"mirrors":13},{"day":8,"posts":3,"comments":5,"mirrors":9},{"day":9,"posts":10,"comments":11,"mirrors":9},{"day":10,"posts":4,"comments":8,"mirrors":6},{"day":11,"posts":8,"comments":4,"mirrors":5},{"day":12,"posts":8,"comments":31,"mirrors":16},{"day":13,"posts":6,"comments":9,"mirrors":8},{"day":14,"posts":5,"comments":11,"mirrors":13},{"day":15,"posts":8,"comments":23,"mirrors":6},{"day":16,"posts":0,"comments":3,"mirrors":7},{"day":17,"posts":2,"comments":8,"mirrors":4},{"day":18,"posts":7,"comments":22,"mirrors":13},{"day":19,"posts":3,"comments":6,"mirrors":3},{"day":20,"posts":6,"comments":12,"mirrors":5}]
    // let ad = [{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":1,"in_reply_to_post_id":364,"post_id":15600,"content_URI":"ar://vvFVTg7KsZ8QbBKzczw1dpKeRdl0GEppZVrUerl69k4","in_reply_to_address":"0xd28e808647d596f33dcc3436e193a9566fc7ac07","in_reply_to_user_name":"lensprotocol","timestamp":"2023-03-13T13:43:40.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15579,"post_id":15590,"content_URI":"ar://HpgMl8zUQwBhPtnB1U_mUXYMqnQGpyWc-7hKIIyMjVo","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-13T10:02:35.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15577,"post_id":15578,"content_URI":"https://data.lens.phaver.com/api/lens/comments/4bccd04e-767d-4edf-bda1-63dfc2c0288f","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-13T09:38:07.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15446,"post_id":15448,"content_URI":"ar://pDs2N5lYmqLIwFAOLz6S3C4sPzSAUu_LQG5htgJaZ0w","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-09T14:33:56.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15440,"post_id":15445,"content_URI":"ar://o9rpZs8iEOwjAinA7T0CzBJFJFGvTcEPLEhYf0Aq6eg","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-09T14:22:26.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15437,"post_id":15438,"content_URI":"https://data.lens.phaver.com/api/lens/comments/0d20a51b-e8c0-4c5c-a13c-d5b4143b3744","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-09T14:13:48.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":1,"in_reply_to_post_id":392,"post_id":15404,"content_URI":"ar://ZFCNYpjY3yuZeTnaZKt7o6fSC94yiETYVfPMxhtLiB0","in_reply_to_address":"0xd28e808647d596f33dcc3436e193a9566fc7ac07","in_reply_to_user_name":"lensprotocol","timestamp":"2023-03-09T03:19:22.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15379,"post_id":15381,"content_URI":"ar://pgCKlGAAMpbXVNq2SPV7lE1rEWlOrdwwRK_-z0Zyjts","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-08T09:09:29.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15367,"post_id":15369,"content_URI":"ar://jzqsfqbHTV_Qn-Ikmt23rFrCaoULkkbIpjuzQ7KJaiM","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-08T04:58:06.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15332,"post_id":15333,"content_URI":"https://data.lens.phaver.com/api/lens/comments/22d611ec-be15-439b-b1ff-ae81b50a43b2","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-06T14:17:23.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":"Beautiful View…","image":"https://images.lens.phaver.com/insecure/rs:fill:512:512:0/g:sm/plain/assets/Lens-fallbackV1.png@png","imageMimeType":"image/png"},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15304,"post_id":15328,"content_URI":"ar://OhHxyi5KjMiW0Yzp_yDdSB-NtOYhz1E3tmLSTRLyteA","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-06T12:57:42.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15320,"post_id":15321,"content_URI":"ar://jGuYpFK2d8C6D5z7RIHwddxQSDi0Tb9u0j8HlG_LOK4","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-06T12:29:09.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15295,"post_id":15312,"content_URI":"ar://w0PrM4S6gCOffOCF6uAGbfcXM8FfhGnLsCr97bHlFjY","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-06T07:05:33.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15308,"post_id":15309,"content_URI":"ar://5sySsczGHDr9rpDNKav-DY3YcuxtwLjf3nSiZNy6WL8","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-06T06:19:48.000Z","type":"Comment","comment_count":1,"mirror_count":1,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15290,"post_id":15303,"content_URI":"ar://RPkRF5IHb0IQKxjgb9SKhMINSZ2UGa2WxOJ1XxaTuuk","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-06T05:16:34.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15299,"post_id":15300,"content_URI":"ar://cAUfUAnf0Wdmt8xwvk6vRewWUfi2KOKKDhfDlWeukJg","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-06T05:13:34.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":15661,"in_reply_to_post_id":597,"post_id":15293,"content_URI":"https://data.lens.phaver.com/api/lens/comments/b7adc3e1-3866-431e-872c-4591c2afdf39","in_reply_to_address":"0xec5c0f3fac5a5d5cdae894361dce1e83fb036f62","in_reply_to_user_name":"hiboo2001","timestamp":"2023-03-06T05:06:14.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":"It's Big, Not Beautiful 😂","image":"https://images.lens.phaver.com/insecure/rs:fill:512:512:0/g:sm/plain/assets/Lens-fallbackV1.png@png","imageMimeType":"image/png"},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15270,"post_id":15278,"content_URI":"ar://I-wysRhhc_y0lCXkud2gUcPNutrHouMn9rNirw4UN1E","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-05T13:19:58.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":null,"image":null,"imageMimeType":null},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15227,"post_id":15234,"content_URI":"https://data.lens.phaver.com/api/lens/comments/da8480a5-359e-4eb9-97cd-2a185c16ccc7","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-04T15:37:44.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":"Upgraded version of Singapore Super Tree","image":"https://images.lens.phaver.com/insecure/rs:fill:512:512:0/g:sm/plain/assets/Lens-fallbackV1.png@png","imageMimeType":"image/png"},{"user_id":2592,"address":"0x1a8167907256ece255be4563c141c88ee16427ca","user_name":"fortunetrees","in_reply_to_user_id":2592,"in_reply_to_post_id":15232,"post_id":15233,"content_URI":"https://data.lens.phaver.com/api/lens/comments/42ade4d3-6ce5-45ce-b740-da9cc932dc8b","in_reply_to_address":"0x1a8167907256ece255be4563c141c88ee16427ca","in_reply_to_user_name":"fortunetrees","timestamp":"2023-03-04T15:36:40.000Z","type":"Comment","comment_count":null,"mirror_count":null,"content":"future world","image":"https://images.lens.phaver.com/insecure/rs:fill:512:512:0/g:sm/plain/assets/Lens-fallbackV1.png@png","imageMimeType":"image/png"}]
    // setState(ps => ({ ...ps, results: ad, isResultLoading: false }))
  }

  const handleSave = async () => {
    if (!wallet) {
      setShowNotConnectTip(true)
      return
    } // in future would like to show error here
    setSaving(true)
    let resp = await fetch('/api/saveQuery', {
      method: "POST",
      body: JSON.stringify({ promptText, SQL, address: wallet?.accounts[0].address })
    })
    if (resp.status != 200) return console.error('error', resp)
    let response = await resp.json()
    console.log(response)
    await props.getFiles()
    setSaving(false)
  }

  useImperativeHandle(ref, () => ({
    handleRun: () => {
      handleRun();
    }
  }));

  const onchangeInsight = () => {
    console.log(showChart)
    if (showChart === 0) {
      if (results && results.length !== 0) {
        let xParams = ['day', 'date', 'week', 'month', 'timestamp'];
        const keys = Object.keys(results[0])
        console.log(keys)
        let xKey = ''
        keys.map((t) => {
          if (xParams.includes(t)) {
            xKey = t
          }
        })
        if(xKey){
          setShowChart(1)
        }else{
          setShowChart(2)
        }
      }
    }else{
      setShowChart(0)
    }
  }


  return (
    <div>
      {/* search bar / prompt part */}

      {/* <div className='h-[220px] shadow rounded-[16px] p-4 pb-6'>
        <textarea className='w-full h-[120px] border-none rounded-[10px] resize-none' placeholder='Please describe the data you want' value={promptText} onChange={(e) => setState(ps => ({ ...ps, promptText: e.target.value }))}></textarea>
        <div className='bg-[#F4F4F4] mr-[20px] ml-[auto] w-[50px] h-[50px] rounded-[50%] flex items-center justify-center shadow'>
          <Image
            className="cursor-pointer"
            src={Enter}
            alt=""
            onClick={() => handleRun()}
          />
        </div>
      </div> */}

      {!SQL && !isSqlLoading ? <>
        {/* <div className="my-5 text-[26px] font-[700]">Description examples</div>
        {
          examples.slice(0, 4).map((t: any, i: number) => (
            <div key={i} className="shadow rounded-[16px] px-5 py-5 mb-5 cursor-pointer" onClick={() => {
              setState(pS => ({ ...pS, promptText: t.text })) // changes UI
              handleRun(t.text) // setState is async so we have to pass it in manually
            }}>{t.text}</div>
          ))
        } */}
      </> : <>
        {/* Magic is happening / SQL part */}
        <div className='mt-5'>
          <div className=' w-[fit-content] py-2 text-[26px]'>{SQL ? 'SQL' : 'Magic is happening…'}</div>
          <div className='h-[260px] shadow py-2 px-3 whitespace-pre-line rounded-[16px] flex items-center'>
            {
              isSqlLoading &&
              <Image
                src={Loading}
                alt=""
              />
            }
            {SQL ?
              <textarea className='w-full h-full border-none rounded-[10px] resize-none' value={SQL}
                onChange={(e) => setState(ps => ({ ...ps, SQL: e.target.value }))}>
                {SQL}
              </textarea>
              : null}
          </div>
        </div>
      </>}

      <div className='flex justify-end my-5'>
        {/* save: onclick should save in the DB fangren mentioned */}
        <button className='w-[100px] flex justify-center items-center h-[46px] rounded-[10px] cursor-pointer shadow mr-5' onClick={handleSave} disabled={saving}>{saving ? "Saving" : "Save"}</button>
        {/* <button className='w-[100px] flex justify-center items-center h-[46px] rounded-[10px] cursor-pointer rounded-[10px] shadow mr-5'>Explain</button> */}
        {/* run: should rerun query to show table / chart again */}
        <button className='w-[100px] flex justify-center items-center h-[46px] rounded-[10px] cursor-pointer shadow mr-5' onClick={() => getResults(SQL)}>Run</button>
        <button className='w-[100px] flex justify-center items-center h-[46px] rounded-[10px] cursor-pointer shadow mr-5' onClick={handleClear}>Cancel</button>
      </div>

      <div className='mt-5'>
        <div className='w-[fit-content] py-2 text-[26px]'>Here is your Result</div>
        <div className='shadow p-5 rounded-[16px] mb-5'>
          <div className='flex'>
            <div className='h-[260px] mr-2 w-[calc(100%-70px)]'>
              {
                showChart === 0 &&
                <div className='h-full w-full mb-5 object-contain overflow-scroll'>
                  {isResultLoading ? "Magic is happening..." : results?.length > 0 ? <Table data={results} /> : results != null && "no results"}
                </div>
              }
              {
                showChart === 1 &&
                <div className='h-full w-full mb-5'>
                  {results?.length > 0 ? <Line data={results} /> : results != null && "no results"}

                </div>
              }
              {
                showChart === 2 &&
                <div className='h-full w-full mb-5'>
                  {results?.length > 0 ? <Bar data={results} /> : results != null && "no results"}
                </div>
              }
            </div>
            <div className='ml-[auto]'>
              <div className='shadow rounded-[50%] flex justify-center items-center h-[40px] w-[40px]'>
                <Image
                  src={ChartHover}
                  onClick={() => onchangeInsight()}
                  className='cursor-pointer h-[24px] w-[24px]'
                  alt=""
                />
              </div>
              <div className='shadow rounded-[50%] flex justify-center items-center h-[40px] w-[40px]'>
                <Image
                  src={downloadHover}
                  className='cursor-pointer h-[24px] w-[24px]'
                  alt=""
                />
              </div>
              <div className='shadow rounded-[50%] flex justify-center items-center h-[40px] w-[40px]'>
                <Image
                  src={UploadDefault}
                  onClick={() => props.changePage('polygon')}
                  className='cursor-pointer h-[24px] w-[24px]'
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        <div className='w-full flex mb-5 '>
          <div className='w-[calc(50%-10px)] mr-5 rounded-[16px]'>
            {/* <User /> */}
            {canShowPublications(results) ? <Publications data={results} /> : null}
          </div>

          {/* <div className='shadow h-[200px] w-[calc(50%-10px)] rounded-[10px] p-[20px]'>
            description
          </div> */}
        </div>
      </div>
      {
        showSmartContractTip &&
        <div className='w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0'>
          <div className='w-[460px] database-alert bg-[#fff] rounded-[10px] p-8 shadow'>
            <div className='flex'>
              <div className='w-[80%] flex items-center'>Your Result is being delivered to smart contract</div>
              <div className='cursor-pointer ml-[auto] h-[40px] w-[40px] flex items-center justify-center bg-[#F4F4F4] rounded-[50%] shadow' onClick={() => setShowSmartContractTip(false)}>
                <Image
                  className="h-[20px] w-[20px]"
                  src={Close}
                  alt=""
                />
              </div>
            </div>
            <div className='flex justify-end mt-20'>
              <button className='bg-[#181EFF] px-5 py-2 rounded-[10px] w-[fit-content] text-[#fff]'>Description examples</button>
            </div>
          </div>
        </div>
      }

      {
        showNotConnectTip &&
        <div className='w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.5)] fixed top-0 left-0'>
          <div className='w-[460px] database-alert bg-[#fff] rounded-[10px] p-8 shadow'>
            <div className='flex'>
              <div className='w-[80%] flex items-center'>Please connect your wallet first</div>
              <div className='cursor-pointer ml-[auto] h-[40px] w-[40px] flex items-center justify-center bg-[#F4F4F4] rounded-[50%] shadow' onClick={() => setShowNotConnectTip(false)}>
                <Image
                  className="h-[20px] w-[20px]"
                  src={Close}
                  alt=""
                />
              </div>

            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default forwardRef(DatabasePage2)
