import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export default function Sign() {
  const navigate = useNavigate();
  // State variables for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  // Function to handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Future API call
    try{
      if (formData.email === "admin@123.com" && formData.password==="admin@123"){
          localStorage.setItem('token', 'wdhkcblk');
          navigate('/dashboard');
      } else {
          console.error("Login Failed")
          alert('Invalid credentials')
      }
    } catch(err){
      console.error(err);
      setError(err.response.data.message)
    }

    console.log("Form data submitted:", formData);
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center flex-col gap-8 bg-gray-50">
      <h1 className="text-xl font-bold">SAMPLE LOGO</h1>
      <div className="w-full max-w-md space-y-4 rounded-lg bg-[beige] p-10 border-2 border-red-400">
        <h2 className="text-center text-3xl font-semibold tracking-tight">
          Sign In
        </h2>
        <p className="text-center text-sm text-muted-foreground">
          New to our product?
          <span className="text-red-400 cursor-pointer" onClick={() => navigate("/createacc")}> Create an account</span>
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Enter your email"
              required
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border-2 border-red-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Enter your password"
              required
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="border-2 border-red-400"
            />
          </div>
          <div className="flex items-center ">
            <div className="flex items-center space-x-2">
              <input
                className="h-4 w-4 rounded border-gray-300"
                id="remember"
                type="checkbox"
              />
              <label className="text-sm text-gray-600" htmlFor="remember">
                Keep me signed in
              </label>
            </div>
          </div>
          <Button
            className="w-full bg-green-900 hover:bg-green-700"
            type="submit"
          >
            Sign In
          </Button>
          {error && (
            <p className="text-sm text-red-500 mt-1 font-bold">{error}</p>
          )}
        </form>
        <p className="text-center text-sm text-red-400 cursor-pointer" onClick={() => navigate("/passreset")}>
          forgot your password?
        </p>
      </div>
    </div>
  );
}
