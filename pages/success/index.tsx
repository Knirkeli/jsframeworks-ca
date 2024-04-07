import React from "react";
import Navbar from "../../components/Navbar"; // Update with your actual path
import Footer from "../../components/Footer"; // Update with your actual path
import "../../app/globals.css";
import Link from "next/link";
import { Button } from "../../components/ui/button";

const SuccessPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center space-y-4 p-4">
          <h1 className="text-4xl font-bold">Success!</h1>
          <p className="text-xl mb-4">Your purchase was successful.</p>
          <Link className="mt-4" href="/">
            <Button variant="outline">Shop More</Button>
          </Link>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default SuccessPage;
