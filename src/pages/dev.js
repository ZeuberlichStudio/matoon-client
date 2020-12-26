import React from 'react';
import { SpinningLoader as Loader } from 'features/loader';

const { API_URL } = process.env;

export default function DevPage() {
  return (
    <Loader/>
  );
}