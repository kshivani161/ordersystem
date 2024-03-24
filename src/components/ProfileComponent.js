import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProfileComponent = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const userDocRef = doc(firestore, 'users', user.uid);
                    const userDocSnapshot = await getDoc(userDocRef);

                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        setUserData(userData);
                    } else {
                        console.log('User document not found in Firestore.');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error.message);
                }
            } else {
                // User is not logged in
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            {userData ? (
                <div>
                    <p>Name: {userData.username}</p>
                    <p>Email: {userData.email}</p>
                    
                    {/* Add more user data fields as needed */}
                </div>
            ) : (
                <p>Please sign in to view your profile.</p>
            )}
        </div>
    );
};

export default ProfileComponent;

// import React, { useState, useEffect } from 'react';
// import { collection, doc, getDoc } from 'firebase/firestore';
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app,auth } from "../firebase/firebase";
// import { firestore } from '../firebase/firebase';

// const Profile = () => {
//     const [userData, setUserData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [user,setuser]=useState('');

//     useEffect(() => {
//         const fetchUserData = async () => {
            
//                 const auth = getAuth(app);
//                 const unsubscribe = onAuthStateChanged(auth, (user) => {
//                     if (user) {
                    
//                         setuser(user.email);
                        
//                     } else {
//                         setuser('');
                        
//                     }
//                 });
//             try {
//                 console.log(user);
//                 if (!user) {
//                     throw new Error('User not logged in.');
//                 }

//                 const docRef = doc(firestore, 'users', user);
//                 const docSnapshot = await getDoc(docRef);

//                 if (docSnapshot.exists()) {
//                     setUserData(docSnapshot.data());
//                 } else {
//                     throw new Error('User data not found.');
//                 }

//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//                 setError('Error fetching user data. Please try again later.');
//                 setLoading(false);
//             }
//         };

//         fetchUserData();
//     }, []);

//     return (
//         <div className="container mt-5">
//             <h1 className="text-center mb-4">Profile</h1>
//             {loading && <p>Loading user data...</p>}
//             {error && <p className="text-danger">{error}</p>}
//             {userData && (
//                 <div>
//                     <h2>{userData.username}</h2>
//                     <p>Email: {userData.email}</p>
//                     <p>Address: {userData.Address}</p>
//                     <p>PhoneNumber:{userData.phonenumber}</p>
//                     {/* Add more user data fields here */}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Profile;
