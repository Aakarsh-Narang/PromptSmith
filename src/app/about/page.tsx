"use client";


import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Github, Linkedin } from "lucide-react";
import { Code, Shield, Clock, Info } from "lucide-react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700"],
});


export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:px-12">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10">
          {/* Text Section */}
          <div className="md:w-3/5">

            <h1
              className={`${orbitron.className} text-2xl md:text-3xl font-bold tracking-wide bg-gradient-to-r from-indigo-900 via-purple-700 to-skyblue-500 bg-clip-text text-transparent antialiased`}
            >
              PromptSmith
            </h1>


          <p className="text-lg mb-4 leading-relaxed text-muted-foreground">
            <strong>PromptSmith</strong> is an AI-powered code generation tool designed to bridge the gap between natural language and production-ready UI code.
            Built using <span className="font-semibold text-primary">Google Gemini</span>, <span className="font-semibold text-primary">Firebase Genkit</span>, and <span className="font-semibold text-primary">Tailwind CSS</span>, it empowers developers to create 
            <span className="font-semibold text-green-500"> HTML</span>, <span className="font-semibold text-green-500">React</span>, or <span className="font-semibold text-green-500">JavaScript</span> components instantly from simple prompts.
            <br />
            <i> The number of supported output languages can be easily extended by making simple changes in the backend.</i>
          </p>


           <p className="text-lg mb-4 leading-relaxed text-muted-foreground">
            Whether you're a beginner exploring frontend development or an experienced developer building MVPs and prototypes, <strong>PromptSmith</strong> bridges natural language and production-ready UI code.
          </p>

          <p className="text-lg mb-4 leading-relaxed text-muted-foreground">           
            Powered by AI, it showcases modern UI design and modular architecture, allowing new output formats to be added easily while maintaining flexibility and scalability.
          </p>


            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-2">About the Creator</h2>
              <p className="text-base leading-relaxed text-muted-foreground mb-4">
                Hi, I’m <strong>Aakarsh Narang</strong>, a passionate developer and builder, currently pursuing a <strong>B.Tech in IT (2027)</strong> at <strong>IIIT Gwalior</strong>. This project is a result of my exploration into generative AI, developer tooling, and the Google ecosystem. 
                I believe in making technology more accessible, and GemForge is one step in that direction.
              </p>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Connect with me</h3>
                <div className="flex items-center gap-4">
                  <Link
                    href="https://github.com/Aakarsh-Narang"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/aakarsh-narang-a7282228b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/3">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
              <Image
                src="/me.jpg" // Replace with actual path
                alt="Anukrati Chaturvedi"
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} GemForge. Powered by Google Gemini, built by Anukrati.
      </footer>
    </div>
  );
}
