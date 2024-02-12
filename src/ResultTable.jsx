import React from 'react';

const ResultTable = ({ data }) => {
  return (
      <>
      <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
        <tbody>
          <tr>
            <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">No</th>
            <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Probabilitas</th>
            <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Prediksi</th>
            <th scope="col" className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100">Segmen Batuk</th>
          </tr>
          {data.prediction.map((_, index) => (
            <tr className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none" key={index}>
              <td data-th="No" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{index + 1}</td>
              <td data-th="Probabilitas" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{data.probability[index]}</td>
              <td data-th="Prediksi" className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">{data.prediction[index] === 0 ? "Negatif" : "Positif"}</td>
              <td data-th="Segmen Batuk" className="before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell min-h-min px-6 py-3 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                {data.wav_base64[index] ? (
                  <audio controls="controls" autobuffer="autobuffer">
                    <source src={`data:audio/wav;base64,${data.wav_base64[index]}`} />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  'No WAV data'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  );
};

export default ResultTable;