import { useEffect, useState } from "react";
import {
  FaBuilding,
  FaGlobe,
  FaMapMarkerAlt,
  FaImage,
  FaSave,
} from "react-icons/fa";

import api from "../../services/api";

function CompanySettings() {

  const [company, setCompany] = useState({

    name: "",
    website: "",
    location: "",
    description: "",
    logo: "",

  });

  const [logo, setLogo] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {

    loadCompany();

  }, []);

  async function loadCompany() {

    try {

      const response = await api.get("/settings/company");

      setCompany(response.data);

      setPreview(response.data.logo);

    }

    catch (err) {

      console.log(err);

    }

  }

  function handleChange(e) {

    setCompany({

      ...company,

      [e.target.name]: e.target.value,

    });

  }

  function handleLogo(e) {

    const file = e.target.files[0];

    if (!file) return;

    setLogo(file);

    setPreview(URL.createObjectURL(file));

  }

  async function uploadLogo() {

    if (!logo) return;

    const formData = new FormData();

    formData.append("image", logo);

    const response = await api.post(

      "/settings/company/logo",

      formData,

      {

        headers: {

          "Content-Type": "multipart/form-data",

        },

      }

    );

    return response.data.company_logo;

  }

  async function saveCompany() {

    try {

      setLoading(true);

      let logoURL = company.logo;

      if (logo) {

        logoURL = await uploadLogo();

      }

      await api.put(

        "/settings/company",

        {

          company_name: company.name,

          company_website: company.website,

          company_location: company.location,

          company_description: company.description,

        }

      );

      await loadCompany();

      alert("Company Updated Successfully ✅");

    }

    catch (err) {

  console.log(err);

  console.log(err.response);

  console.log(err.response?.data);

  alert(
    JSON.stringify(err.response?.data)
  );

}

    finally {

      setLoading(false);

    }

  }

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">

      <div className="flex items-center gap-4 mb-8">

        <div className="bg-purple-600 p-4 rounded-2xl text-2xl">

          <FaBuilding />

        </div>

        <div>

          <h2 className="text-3xl font-bold">

            Company Information

          </h2>

          <p className="text-gray-400">

            Update organization details

          </p>

        </div>

      </div>

      <div className="flex justify-center mb-10">

        <div className="relative">

          <img

            src={
              preview ||
              "https://placehold.co/180x180/png"
            }

            className="w-36 h-36 rounded-3xl object-cover border-4 border-purple-500"

          />

          <label className="absolute bottom-2 right-2 bg-purple-600 p-3 rounded-full cursor-pointer hover:bg-purple-700">

            <FaImage />

            <input

              type="file"

              hidden

              accept="image/*"

              onChange={handleLogo}

            />

          </label>

        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>

          <label className="mb-2 block">

            Company Name

          </label>

          <div className="relative">

            <FaBuilding className="absolute left-4 top-4 text-gray-400"/>

            <input

              type="text"

              name="name"

              value={company.name}

              onChange={handleChange}

              className="w-full pl-12 py-4 rounded-xl bg-slate-900 border border-white/10"

            />

          </div>

        </div>

        <div>

          <label className="mb-2 block">

            Website

          </label>

          <div className="relative">

            <FaGlobe className="absolute left-4 top-4 text-gray-400"/>

            <input

              type="text"

              name="website"

              value={company.website}

              onChange={handleChange}

              className="w-full pl-12 py-4 rounded-xl bg-slate-900 border border-white/10"

            />

          </div>

        </div>

        <div>

          <label className="mb-2 block">

            Location

          </label>

          <div className="relative">

            <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400"/>

            <input

              type="text"

              name="location"

              value={company.location}

              onChange={handleChange}

              className="w-full pl-12 py-4 rounded-xl bg-slate-900 border border-white/10"

            />

          </div>

        </div>

      </div>

      <div className="mt-6">

        <label className="mb-2 block">

          Company Description

        </label>

        <textarea

          rows="5"

          name="description"

          value={company.description}

          onChange={handleChange}

          className="w-full bg-slate-900 border border-white/10 rounded-xl p-4"

        />

      </div>

      <div className="flex justify-end mt-8">

        <button

          onClick={saveCompany}

          disabled={loading}

          className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl"

        >

          <FaSave />

          {

            loading

            ?

            "Saving..."

            :

            "Save Company"

          }

        </button>

      </div>

    </div>

  );

}

export default CompanySettings;