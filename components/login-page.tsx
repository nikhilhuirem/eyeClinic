import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Login() {
  return (
    <div>
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center bg-muted p-6 md:p-10">
          <div className="w-full max-w-md space-y-6">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Doctor Login</h1>
              <p className="text-muted-foreground">
                Enter your username and password to access the doctor portal.
              </p>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="doctor-username">Username</Label>
                <Input id="doctor-username" placeholder="Enter your username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doctor-password">Password</Label>
                <Input
                  id="doctor-password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <Button type="submit" className="w-full">
                Login as Doctor
              </Button>
            </form>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
}
