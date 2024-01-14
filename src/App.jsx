import { useState, useRef, useEffect } from 'react'
import Lottie from "lottie-react";
import lottieLoading from "./assets/Lottie - loading.json";
import lottieError from "./assets/Lottie - error.json";
import lottieHealthy from "./assets/Lottie - healthy.json";
import lottieSick from "./assets/Lottie - sick.json";
import exampleWav from "./assets/example.wav";
import { useWavesurfer } from '@wavesurfer/react'

function App() {
  const [audioFile, setAudioFile] = useState(null)
  const [symptoms, setSymptoms] = useState({
    kesulitan_bernapas: false,
    pilek: false,
    batuk: false,
    demam: false,
    anosmia: false,
    nyeri_otot: false,
    sakit_tenggorokan: false,
    diare: false,
    kelelahan: false,
  })
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const gejala = {
    kesulitan_bernapas: "Kesulitan Bernapas",
    pilek: "Pilek",
    batuk: "Batuk",
    demam: "Demam",
    anosmia: "Anosmia",
    nyeri_otot: "Nyeri Otot",
    sakit_tenggorokan: "Sakit Tenggorokan",
    diare: "Diare",
    kelelahan: "Kelelahan",
  }

  const containerRef = useRef(null)
  var { wavesurfer, isPlaying, _ } = useWavesurfer({
    container: containerRef,
    fillParent: true,
    width: 300,
    waveColor: 'rgb(49, 196, 141)',
    progressColor: 'rgb(63, 131, 248)',
    barWidth: 5,
    barGap: 3,
    barRadius: 3,
    url: exampleWav
  })

  const onPlayPause = () => {
    wavesurfer.playPause()
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setAudioFile(selectedFile);
    if(selectedFile != null || selectedFile != undefined){
      window.fileURL = URL.createObjectURL(selectedFile);  
      wavesurfer.load(window.fileURL);
    }
    else{
      setAudioFile(null)
    }
  }

  const handleSymptomChange = (symptom) => {
    setSymptoms((prevSymptoms) => ({
      ...prevSymptoms,
      [symptom]: !prevSymptoms[symptom],
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStep((prevStep) => prevStep + 1);

    try {
      setLoading(true); // Set loading state to true
  
      const formData = new FormData();
      formData.append('berkas_audio', audioFile);
      Object.entries(symptoms).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      const response = await fetch('http://127.0.0.1:5000/predict_covid', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setResult(data);
        setError(null);
      } else {
        const data = await response.json();
        setError(data.error);
        setResult(null);
      }
    } catch (error) {
      setError(`Error: ${error.message}`);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    wavesurfer.pause()
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    wavesurfer.pause()
    setStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    location.reload();
  };
  
  return (
  <>

    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Seminar Hasil
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-2xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Praskrining COVID-19
            </h1>
            
            <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
              <li className={`flex items-center ${step === 1 ? 'text-blue-600 dark:text-blue-500' : ''}`} id="1">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                  1
                </span>
                Unggah Suara Batuk
                <svg
                  className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                  />
                </svg>
              </li>
              <li className={`flex items-center ${step === 2 ? 'text-blue-600 dark:text-blue-500' : ''}`} id="2">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  2
                </span>
                Cek Gejala
                <svg
                  className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                  />
                </svg>
              </li>
              <li className={`flex items-center ${step === 3 ? 'text-blue-600 dark:text-blue-500' : ''}`} id="3">
                <span className="flex items-center justify-center w-5 h-5 me-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                  3
                </span>
                Hasil Deteksi
              </li>
            </ol>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              {/* Step 1 */}
                <div className={`flex items-center justify-center w-full ${step != 1 ? 'hidden' : ''}`} id="1">
                  <label
                    htmlFor="berkas_audio"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div ref={containerRef} hidden={audioFile != null ? false : true} />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400" hidden={audioFile != null ? false : true}>
                      <span className="font-semibold">Klik untuk mengubah</span> atau drag and drop
                    </p>
                    {audioFile === null && 
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Klik untuk mengunggah</span> atau drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Berkas audio WAV</p>
                      </div>
                    }

                    <input
                      id="berkas_audio"
                      name="berkas_audio"
                      type="file"
                      accept=""
                      onChange={handleFileChange}
                      required=""
                      className="hidden"
                    />
                  </label>
                </div>
              

              {/* Step 2 */}
              {step === 2 && (
                <div>
                  <ul className="grid w-full gap-2 lg:gap-4 md:grid-cols-3" id="2">
                    {Object.entries(symptoms).map(([key, value]) => (
                      <div key={key}>
                        <li>
                          <input
                            type="checkbox"
                            id={key}
                            onChange={() => handleSymptomChange(key)}
                            checked={value}
                            className="hidden peer"
                            required=""
                          />
                          <label
                            htmlFor={key}
                            className="inline-flex items-center justify-between w-full p-2 text-gray-800 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-green-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                          >
                            <div className="flex gap-2">
                              {value && 
                                <svg className="w-6 h-6 text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                                </svg>
                              }
                              {!value && 
                                <svg className="w-6 h-6 text-gray-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                </svg>
                              }
                              <div className="w-full text-md ">{gejala[key]}</div>
                            </div>
                          </label>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div id="3">
                  {loading && (
                    <>
                      <div className='w-full flex justify-center'>
                        <Lottie className='w-48 h-48 ' animationData={lottieLoading} />
                      </div>
                      <p className='text-center'>Sedang menganalisa...</p>
                    </>
                  )}

                  {result && !loading && (
                    <>
                      <div className='w-full flex justify-center'>
                        <Lottie className='w-48 h-48 ' 
                          animationData={
                            result.prediction.includes(1) ? lottieSick : lottieHealthy
                          } 
                        />;
                      </div>
                      <p className='text-center'>
                        {result.prediction.includes(1)
                          ? `Terdapat ${result.prediction.length} segmen batuk, ${result.prediction.filter(value => value === 1).length} terindikasi COVID-19!!!`
                          : `Terdapat ${result.prediction.length} segmen batuk, tidak ada prediksi batuk COVID-19...`}
                      </p>
                    </>
                  )}

                  {error && !loading && (
                    <>
                      <div className='w-full flex justify-center'>
                        <Lottie className='w-48 h-48 ' animationData={lottieError} />
                      </div>
                      <p className='text-center'>{error}</p>
                    </>
                  )}
                </div>
              )}


              {/* Navigation Buttons */}
              <div className={`flex mt-4 ${
                (step === 1 && audioFile === null) ? 'justify-end' :
                ((step === 2) || (step === 1 && audioFile != null)) ? 'justify-between' :
                'justify-center'
              }`}>
                {step === 1 && audioFile != null && (
                  <button className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-emerald-50 text-emerald-500 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-100 disabled:text-emerald-400 disabled:shadow-none"
                    type="button"
                    onClick={onPlayPause}
                  >
                    <span className="order-2">{isPlaying ? 'Pause' : 'Play'}</span>
                    <span className="relative only:-mx-6">
                      {isPlaying ? 
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-1" fill="none" stroke="currentColor" >
                        <path d="M3 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm7 0H9a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Z"/>
                      </svg>
                      :
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mt-1" fill="none" stroke="currentColor" >
                        <path d="M0 .984v14.032a1 1 0 0 0 1.506.845l12.006-7.016a.974.974 0 0 0 0-1.69L1.506.139A1 1 0 0 0 0 .984Z"/>
                      </svg>
                      }
                    </span>
                  </button>
                )}

                {step === 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={audioFile != null ? false : true}
                    className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-600 focus:bg-blue-200 focus:text-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-100 disabled:text-blue-400 disabled:shadow-none"
                  >
                    Selanjutnya
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide transition duration-300 rounded-full focus-visible:outline-none justify-self-center whitespace-nowrap bg-blue-50 text-blue-500 hover:bg-blue-100 hover:text-blue-600 focus:bg-blue-200 focus:text-blue-700 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-100 disabled:text-blue-400 disabled:shadow-none"
                  >
                    Kembali
                  </button>
                )}

                {step === 2 && (
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded-full shadow-lg focus-visible:outline-none whitespace-nowrap bg-blue-500 shadow-blue-200 hover:bg-blue-600 hover:shadow-md hover:shadow-blue-200 focus:bg-blue-700 focus:shadow-md focus:shadow-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none"
                  >
                    Prediksi COVID-19
                  </button>
                )}

                {step === 3 && loading === false && (
                  <button
                    type="button"
                    onClick={handleReset}
                    hidden={loading}
                    className="inline-flex items-center justify-center h-12 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded-full shadow-lg focus-visible:outline-none whitespace-nowrap bg-slate-500 shadow-slate-200 hover:bg-slate-600 hover:shadow-md hover:shadow-slate-200 focus:bg-slate-700 focus:shadow-md focus:shadow-slate-200 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-300 disabled:shadow-none"
                  >
                    Ulangi
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>


  </>
  )
}

export default App
