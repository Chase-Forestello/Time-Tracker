import React, { useState } from 'react';
import Papa from 'papaparse';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

const allowedExtensions = ['csv'];

const CsvToPdfConverter = () => {
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setError('');

    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split('/')[1];

      if (!allowedExtensions.includes(fileExtension)) {
        setError('Please input a CSV file');
        return;
      }

      setFile(inputFile);
    }
  };

  const handleParse = async () => {
    if (!file) return alert('Enter a valid file');

    const reader = new FileReader();

    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, {
        header: true,
      });

      const parsedData = csv?.data;

      if (!parsedData || parsedData.length === 0) {
        alert('No data found in the CSV file');
        return;
      }

      // Filter only the specified columns
      const filteredData = parsedData.map((row) => ({
        Username: row['Username'],
        'Time Label': row['Time Label'],
        'Time Tracked': row['Time Tracked'],
        'Task Name': row['Task Name'],
        'User Total': row['User Total'],
        'User Period': row['User Period'],
      }));

      await generatePDF(filteredData);
    };

    reader.readAsText(file);
  };

  const generatePDF = async (data) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const { width, height } = page.getSize();
    const fontSize = 12;
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const content = data
      .map((row) => Object.entries(row).map(([key, value]) => `${key}: ${value}`))
      .join('\n');

    page.drawText(content, {
      x: 50,
      y: height - 50,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <div className="App">
      <div className="container">
        <input onChange={handleFileChange} id="csvInput" name="file" type="file" />
        <div>
          <button onClick={handleParse}>Convert to PDF</button>
        </div>
        {error ? error : null}
      </div>
    </div>
  );
};

export default CsvToPdfConverter;
