import { useEffect } from "react";
import { useState } from "react";

function App() {
  const defaultValue = {};
  const [form, setForm] = useState({
    nama: { value: "", errStatus: false, message: "" },
    nomorPolis: {
      value: "",
      errStatus: false,
      message: "",
    },
    fotoKendaraan: {
      value: undefined,
      errStatus: false,
      message: "",
    },
    deskripsi: {
      value: "",
      errStatus: false,
      message: "",
    },
  });

  const [submitted, setSubmitted] = useState(false);

  const [filePreview, setFilePreview] = useState(undefined);

  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: value,
      },
    }));
  };

  const handleSelectFile = (e) => {
    if (!e.target.files || e.target.files.length == 0) {
      setForm((prev) => ({
        ...prev,
        fotoKendaraan: {
          ...form.fotoKendaraan,
          value: undefined,
        },
      }));
      return;
    }
    setForm((prev) => ({
      ...prev,
      fotoKendaraan: {
        ...form.fotoKendaraan,
        value: e.target.files[0],
      },
    }));
  };

  useEffect(() => {
    if (!form.fotoKendaraan.value) {
      setFilePreview(undefined);
      return;
    }

    const objUrl = URL.createObjectURL(form.fotoKendaraan.value);
    setFilePreview(objUrl);
  }, [form]);

  const handleSubmit = () => {
    if (
      !form.nama.value ||
      !form.nomorPolis.value ||
      !form.fotoKendaraan.value ||
      !form.deskripsi.value
    ) {
      alert("Data belum ter isi dengan lengkap");
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    setSubmitted(false);
  };

  const handleEmptyValidation = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        errStatus: !value,
        message: !value ? "tidak boleh kosong!" : "",
      },
    }));
  };

  const handleOnFocus = (name) => {
    setForm((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        errStatus: false,
        message: "",
      },
    }));
  };

  return (
    <div className="flex flex-row p-4">
      <div className="w-full">
        <p className="text-center mx-auto text-green-400 mb-4">
          Form Pengajuan
        </p>
        {!submitted ? (
          <form
            className="flex flex-col gap-2 bg-white"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col p-4 bg-white drop-shadow-2xl">
              <label for="nama" className="mb-2 text-purple-600">
                Nama lengkap
              </label>
              <input
                name="nama"
                id="nama"
                type={"text"}
                className="w-full border-b focus:outline-none border-black"
                onChange={handleOnChange}
                placeholder="input nama lengkap"
                onBlur={(e) =>
                  handleEmptyValidation(e.target.name, e.target.value)
                }
                onFocus={(e) => handleOnFocus(e.target.name)}
              ></input>
              {form.nama.errStatus && (
                <p className="text-sm text-red-500 mb-4">{form.nama.message}</p>
              )}

              <label for="polis" className="mb-2 text-purple-600">
                Nomor Polis
              </label>
              <input
                name="nomorPolis"
                id="polis"
                type={"tel"}
                maxLength="16"
                className="w-full border-b focus:outline-none border-black"
                onChange={handleOnChange}
                placeholder="input nomor polis"
                onBlur={(e) =>
                  handleEmptyValidation(e.target.name, e.target.value)
                }
                onFocus={(e) => handleOnFocus(e.target.name)}
              ></input>
              {form.nomorPolis.errStatus && (
                <p className="text-sm text-red-500 mb-4">
                  {form.nomorPolis.message}
                </p>
              )}

              <label for="foto" className="mb-2 text-purple-600">
                Upload Foto Kendaraan
              </label>
              {form.fotoKendaraan.value && (
                <img className="my-2 w-[10rem] mx-auto" src={filePreview} />
              )}
              <div className="flex flex-row gap-2">
                <input
                  name="fotoKendaraan"
                  id="foto"
                  type="file"
                  onChange={handleSelectFile}
                  className="w-full border focus:outline-none border-black cursor-pointer"
                  hidden
                ></input>
                <p className="border p-1 border-gray-300 bg-gray-300 text-gray-600 w-3/4 cursor-default">
                  {form.fotoKendaraan.value
                    ? form.fotoKendaraan.value.name
                    : "Browse..."}
                </p>
                <label
                  for="foto"
                  className="w-1/4border border-blue-500 p-1 text-center rounded-md bg-blue-500 text-white drop-shadow-md cursor-pointer"
                >
                  Upload
                </label>
              </div>

              {form.fotoKendaraan.errStatus && (
                <p className="text-sm text-red-500 mb-4">
                  {form.fotoKendaraan.message}
                </p>
              )}

              <label className="text-purple-600" for="deskripsi">
                Deskripsi Claim
              </label>
              <input
                name="deskripsi"
                id="deskripsi"
                onChange={handleOnChange}
                className="w-full border-b focus:outline-none border-black"
                placeholder="input deskripsi"
                onBlur={(e) =>
                  handleEmptyValidation(e.target.name, e.target.value)
                }
                onFocus={(e) => handleOnFocus(e.target.name)}
              ></input>
              {form.deskripsi.errStatus && (
                <p className="text-sm text-red-500 mb-4">
                  {form.deskripsi.message}
                </p>
              )}
            </div>
            <div className="flex flex-row justify-between gap-2 mt-2">
              <button
                type="submit"
                className="border border-blue-400 bg-blue-400 rounded-md  p-2 w-full cursor-pointer text-white"
              >
                SUBMIT
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="font-bold text-[24px] whitespace-normal break-words">
              {form.nama.value}
            </p>
            <p className="font-semibold text-[18px]">{form.nomorPolis.value}</p>
            <div className="flex flex-col gap-1">
              <img className="my-2 w-[20rem] mx-auto" src={filePreview} />
              <p className="text-[12px] whitespace-normal break-words">
                {form.fotoKendaraan.value.name}
              </p>
            </div>

            <p className="text-[18px] whitespace-normal break-words">
              {form.deskripsi.value}
            </p>
          </div>
        )}

        {submitted && (
          <button
            type="button"
            className="border border-red-500 rounded-md p-2 w-full cursor-pointer text-red-500"
            onClick={() => window.location.reload()}
          >
            Back
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
