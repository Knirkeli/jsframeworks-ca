import React from "react";
import Navbar from "../../components/Navbar"; // Update with your actual path
import Footer from "../../components/Footer"; // Update with your actual path
import "../../app/globals.css";
import Link from "next/link";
import { Button } from "../../components/ui/button";

const SuccessPage: React.FC = () => {
  return (
    <div>
      <Navbar />
      <main>
        <h1>Success!</h1>
        <p>Your purchase was successful.</p>
        <Link href="/">
          <Button
            variant="default"
            className="px-4 py-2 mt-2 bg-blue-500 rounded hover:bg-blue-600"
          >
            Shop More
          </Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
};

export default SuccessPage;
