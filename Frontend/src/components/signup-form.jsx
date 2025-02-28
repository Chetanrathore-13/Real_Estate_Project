import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function SignupForm({ className, handlelogin, signup, ...props }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to create your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmpassword">Confirm Password</Label>
          <Input
            id="confirmpassword"
            name="confirmpassword"
            type="password"
            onChange={handleChange}
            required
          />
        </div>
        <label className="block text-gray-700 font-medium">Select Role:</label>
        <select
          name="role"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">-- Select Role --</option>
          <option value="vendor">Vendor</option>
          <option value="user">User</option>
        </select>
        <Button type="submit" className="w-full">
          Register
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg
            id="Layer_1"
            enableBackground="new 0 0 512 512"
            height="20"
            viewBox="0 0 512 512"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m472.4 213.9h-190.5c-8.4 0-15.2 6.8-15.2 15.2v60.9c0 8.4 6.8 15.2 15.2 15.2h107.3c-11.7 30.5-33.7 56-61.6 72.2l45.7 79.2c73.3-42.4 116.7-116.9 116.7-200.2 0-11.9-.9-20.4-2.6-29.9-1.4-7.3-7.7-12.6-15-12.6z"
              fill="#167ee6"
            />
            <path
              d="m256.5 396.6c-52.5 0-98.3-28.7-122.9-71.1l-79.2 45.6c40.3 69.9 115.8 116.9 202.1 116.9 42.4 0 82.3-11.4 116.8-31.3v-.1l-45.7-79.2c-21 12.2-45.2 19.2-71.1 19.2z"
              fill="#12b347"
            />
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a onClick={handlelogin} className="underline underline-offset-4 cursor-pointer">
          Sign up
        </a>
      </div>
    </form>
  );
}
