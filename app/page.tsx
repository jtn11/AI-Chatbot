import {
  Bot,
  Sparkles,
  Zap,
  Shield,
  MessageSquare,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";
import Link from "next/link";

export default function ChatbotLandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">ChatAI</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Pricing
              </a>
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/signin">
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">
                  Sign In
                </button>
              </Link>

              <Link href="/signup">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">
                Powered by Advanced AI
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Your AI Assistant for
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Everything
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              Experience the future of conversation with our intelligent
              chatbot. Get instant answers, creative ideas, and expert
              assistance 24/7.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl font-medium text-lg flex items-center justify-center space-x-2 group">
                <span>Start Chatting Free</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all shadow-lg font-medium text-lg border border-gray-200">
                Watch Demo
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Free forever plan</span>
              </div>
            </div>
          </div>

          {/* Demo Chat Preview */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-white text-sm font-medium ml-4">
                  ChatAI Assistant
                </span>
              </div>
              <div className="p-8 space-y-4 bg-gray-50">
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-3 rounded-2xl shadow-sm max-w-md border border-gray-200">
                    <p className="text-gray-800">
                      Hello! How can I help you today?
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-3 rounded-2xl max-w-md">
                    <p>Help me write a professional email</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white px-5 py-3 rounded-2xl shadow-sm max-w-md border border-gray-200">
                    <p className="text-gray-800">
                      I'd be happy to help! What's the purpose of the email?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ChatAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the most advanced conversational AI with features
              designed for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Intelligent Responses
              </h3>
              <p className="text-gray-600">
                Get accurate, context-aware answers powered by cutting-edge AI
                technology
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Instant responses with no waiting. Get answers in milliseconds
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Secure & Private
              </h3>
              <p className="text-gray-600">
                Your conversations are encrypted and never shared with third
                parties
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Natural Conversations
              </h3>
              <p className="text-gray-600">
                Chat naturally like you would with a human. No complex commands
                needed
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Multi-Purpose
              </h3>
              <p className="text-gray-600">
                From writing to coding to learning - one AI assistant for all
                your needs
              </p>
            </div>

            <div className="p-8 bg-linear-to-br from-indigo-50 to-indigo-100 rounded-2xl hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Always Learning
              </h3>
              <p className="text-gray-600">
                Our AI continuously improves to provide better answers over time
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Join thousands of users who are already experiencing the future of
            AI conversation
          </p>
          <button className="px-10 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-50 transition-all shadow-xl hover:shadow-2xl font-bold text-lg">
            Start Your Free Trial
          </button>
          <p className="text-blue-100 text-sm mt-6">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-linear-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold">ChatAI</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your intelligent AI assistant for everything
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 ChatAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
