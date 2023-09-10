import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Example pseudo-code for database operations
async function checkIfEmployeeExists(email) {
  fetch(`https://dashboard.pistonbleu.fr/api/employees/get/email/${email}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data here
      console.log(data); // This will contain the employee data if found
      return data[0] != null;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

async function createEmployee(email) {
  fetch("https://dashboard.pistonbleu.fr//api/employees/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response data here
      console.log(data); // This will contain the response from the server
    })
    .catch((error) => {
      // Handle any errors that may occur during the fetch
      console.error("There was a problem with the fetch operation:", error);
    });
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log;
      if (user.email && user.email.endsWith("@pistonbleu.fr")) {
        const employeeExists = await checkIfEmployeeExists(user.email);

        if (!employeeExists) {
          // Create a new employee record
          await createEmployee(user.email);
        }
        return true;
      } else {
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
