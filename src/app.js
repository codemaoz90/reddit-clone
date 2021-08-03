import { Container, Flex, Spinner, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Post from "./components/post";
import db from "./lib/firebase";

function App() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		db.collection("posts")
			.orderBy("createdAt", "desc")
			.get()
			.then((querySnapShot) => {
				const data = querySnapShot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setPosts(data);
			});
	}, []);

	return (
		<>
			<Container maxW="md" centerContent p={8}>
				<VStack spacing={8} w="100%">
					{posts.map((post) => (
						<Post post={post} key={post.id} />
					))}
				</VStack>
			</Container>
		</>
	);
}

export default App;
