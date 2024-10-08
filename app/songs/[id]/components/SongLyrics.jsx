"use client";

import { Typography } from "@mui/material";

export const SongLyrics = ({lyric}) => {

  return (
    lyric.split('\n\n').map((paragraph, index)=> {
      if(paragraph.includes('*')){
        return(<pre style={{fontFamily:'sans-serif', fontSize: '18px', marginBottom: '15px', fontWeight: 'bold', whiteSpace: 'break-spaces', width:'100%'}} key={index}>{paragraph.replace(/[*+]/g, "")}</pre>)
      } else {
        return(<pre style={{fontFamily:'sans-serif', fontSize: '18px', marginBottom: '15px', width:'100%', whiteSpace: 'break-spaces'}} key={index}>{paragraph}</pre>)
      }
    })
  )
}