import { useState } from 'react'
import viteLogo from '/vite.svg'
import axios from 'axios';
import ImageUploader from './components/ImageUploader';

export default function App() {
  return (
    <>
      <ImageUploader />
    </>
  );
}