import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, TrendingUp, Shield, Zap, Star, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
                Teer Khela <span className="text-sm">with AI</span>
              </span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-4">
              <Link href="/results">
                <Button variant="ghost" size="sm" className="text-sm md:text-base">
                  Results / रिजल्ट
                </Button>
              </Link>
              <Link href="/predictions">
                <Button variant="ghost" size="sm" className="text-sm md:text-base">
                  Predictions / भविष्यवाणी
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm" className="text-sm md:text-base">
                  Login / लॉगिन
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm" className="text-sm md:text-base">
                  Sign Up / साइन अप
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <p className="text-primary font-semibold text-sm md:text-base">
              🎯 AI Powered • 10,000+ Players Ka Bharosa
            </p>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            AI Se Jeeto Big!
            <br />
            <span className="bg-gradient-to-r from-primary to-green-400 bg-clip-text text-transparent">
              Teer Khela AI
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            🎯 <strong>AI bahut important hai!</strong> Hamare advanced AI technology se accurate predictions milega.
            AI-powered dream interpretation, AI algorithms, aur machine learning se winning numbers nikalo.
            Latest results free mein dekho aur premium AI predictions unlock karo!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8">
                ✨ Free Sign Up Karo
              </Button>
            </Link>
            <Link href="/results">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                Free Results Dekho →
              </Button>
            </Link>
            <Link href="/predictions">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8">
                AI Predictions Lo →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">57</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Star className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Active Subscribers</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <TrendingUp className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">54</div>
              <div className="text-sm text-muted-foreground">Predictions</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <Target className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">210</div>
              <div className="text-sm text-muted-foreground">Results</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose Teer Khela AI?
            <br />
            <span className="text-primary">क्यों चुनें तीर खेला AI?</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-primary/20 hover:border-primary transition-colors">
            <CardHeader>
              <Zap className="h-12 w-12 text-primary mb-4" />
              <CardTitle>AI-Powered Predictions</CardTitle>
              <CardDescription>
                Advanced AI algorithms analyze historical data to provide accurate predictions for Bhutan, Shillong, Khanapara, and Juwai Teer.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20 hover:border-primary transition-colors">
            <CardHeader>
              <Shield className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Dream Interpretation</CardTitle>
              <CardDescription>
                110+ dream symbols database with AI-powered interpretation to convert your dreams into lucky numbers.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-primary/20 hover:border-primary transition-colors">
            <CardHeader>
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Formula Calculator</CardTitle>
              <CardDescription>
                Mathematical formulas based on past results. Calculate Direct, House, and Ending numbers with our AI.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Star className="h-6 w-6 text-primary fill-primary" />
            <h2 className="text-3xl md:text-4xl font-bold ml-2">
              Real Users Ka Review
            </h2>
          </div>
          <p className="text-muted-foreground">
            Dekho kya keh rahe hain log jo already use kar rahe hain!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="gradient-card">
            <CardContent className="pt-6">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
                <span className="ml-2 text-sm font-semibold">4.7</span>
                <span className="ml-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded-full">NEW</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">2 hours ago</p>
              <p className="italic">"subscription loi bohot val lagise bro..AI predictions ekdom accurate!"</p>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardContent className="pt-6">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
                <span className="ml-2 text-sm font-semibold">4.8</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">1 week ago</p>
              <p className="italic">"pehle to bharosa nhi tha but 3 din ka plan liya aur kafi accurate numbers mile!"</p>
            </CardContent>
          </Card>

          <Card className="gradient-card">
            <CardContent className="pt-6">
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                ))}
                <span className="ml-2 text-sm font-semibold">4.8</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">5 days ago</p>
              <p className="italic">"subscription liya tha sahi decision tha, AI se predictions bahut help karta hai!"</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <Card className="gradient-primary text-primary-foreground text-center">
          <CardContent className="pt-12 pb-12 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Win Big with AI?
              <br />
              AI के साथ बड़ा जीतने के लिए तैयार हैं?
            </h2>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Join 10,000+ players trusting our AI predictions. Get started for free today!
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                ✨ Free Sign Up Karo - Start Winning!
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Teer Khela with AI. All rights reserved.</p>
            <p className="mt-2">AI-powered predictions for Bhutan, Shillong, Khanapara, and Juwai Teer</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
