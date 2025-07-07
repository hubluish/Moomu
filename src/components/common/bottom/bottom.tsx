'use client'

import React from 'react'
import * as S from './Bottom.styled'

export default function Bottom() {
  return (
    <S.Wrapper>
      <S.Link href="/about">About Us</S.Link>
      <S.Link href="/contact">Contact</S.Link>
      <S.Link href="/privacy">Privacy Policy</S.Link>
    </S.Wrapper>
  )
}