import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { firestore } from '../firebase/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ProfileComponent = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const usersCollectionRef = collection(firestore, 'users');
                    const q = query(usersCollectionRef, where("email", "==", user.email));
                    const querySnapshot = await getDocs(q);

                    querySnapshot.forEach((doc) => {
                        const userData = doc.data();
                        setUserData(userData);
                    });
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
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{backgroundImage: "url('https://tse4.mm.bing.net/th/id/OIP.o87FFVeHAKHqxIRCdpW31wHaEK?w=281&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="card bg-light p-5" style={{ width: '600px' }}> {/* Increase the width of the card */}
                <h1 className="mb-4">Profile</h1>
                {userData ? (
                    <div>
                        <p><b>Name: </b>{userData.username}</p>
                        <p><b>Email: </b> {userData.email}</p>
                        <p><b>Address:</b>{userData.address}</p>
                        <p><b>PhoneNumber: </b>{userData.phoneNumber}</p>
                        
                        {/* Add more user data fields as needed */}
                    </div>
                ) : (
                    <p>Please sign in to view your profile.</p>
                )}
            </div>
        </div>
    );
};

export default ProfileComponent;

// import React, { useState, useEffect } from 'react';
// import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { firestore } from '../firebase/firebase';
// import { collection, query, where, getDocs } from 'firebase/firestore';

// const ProfileComponent = () => {
//     const [userData, setUserData] = useState(null);

//     useEffect(() => {
//         const auth = getAuth();
//         const unsubscribe = onAuthStateChanged(auth, async (user) => {
//             if (user) {
//                 try {
//                     const usersCollectionRef = collection(firestore, 'users');
//                     const q = query(usersCollectionRef, where("email", "==", user.email));
//                     const querySnapshot = await getDocs(q);

//                     querySnapshot.forEach((doc) => {
//                         const userData = doc.data();
//                         setUserData(userData);
//                     });
//                 } catch (error) {
//                     console.error('Error fetching user data:', error.message);
//                 }
//             } else {
//                 // User is not logged in
//                 setUserData(null);
//             }
//         });

//         return () => unsubscribe();
//     }, []);

//     return (
//         <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{backgroundImage: "url('path_to_your_image.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
//             <div className="card bg-light p-3">
//                 <h1 className="mb-4">Profile</h1>
//                 {userData ? (
//                     <div>
//                         <p>Name: {userData.username}</p>
//                         <p>Email: {userData.email}</p>
//                         <p>Address:{userData.address}</p>
//                         <p>PhoneNumber:{userData.phoneNumber}</p>
                        
//                         {/* Add more user data fields as needed */}
//                     </div>
//                 ) : (
//                     <p>Please sign in to view your profile.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ProfileComponent;
