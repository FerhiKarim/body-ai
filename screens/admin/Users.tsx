import { MaterialIcons } from '@expo/vector-icons';
import { Box, Button, HStack, Icon, Input, Pressable, VStack } from '@gluestack-ui/themed';
import React, { useState } from 'react';
import { ScrollView, Text } from 'react-native';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      setUsers([
        ...users,
        {
          id: Date.now().toString(),
          ...newUser,
        },
      ]);
      setNewUser({ name: '', email: '', role: 'user' });
      setIsAddingUser(false);
    }
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <Box flex={1} bg="$backgroundLight50" p="$4">
      <VStack space="lg">
        <HStack justifyContent="space-between" alignItems="center">
          <Text className="text-2xl font-bold text-gray-900">Users Management</Text>
          <Button
            onPress={() => setIsAddingUser(true)}
            bg="$primary500"
            _hover={{ bg: '$primary600' }}
          >
            <HStack space="sm" alignItems="center">
              <Icon as={MaterialIcons} name="add" size="sm" color="$white" />
              <Text className="text-white">Add User</Text>
            </HStack>
          </Button>
        </HStack>

        {/* Add User Form */}
        {isAddingUser && (
          <Box
            bg="$backgroundLight50"
            p="$4"
            rounded="$lg"
            borderWidth={1}
            borderColor="$borderLight200"
          >
            <VStack space="md">
              <Input
                placeholder="Name"
                value={newUser.name}
                onChangeText={(text) => setNewUser({ ...newUser, name: text })}
              />
              <Input
                placeholder="Email"
                value={newUser.email}
                onChangeText={(text) => setNewUser({ ...newUser, email: text })}
                keyboardType="email-address"
              />
              <HStack space="md">
                <Button
                  flex={1}
                  onPress={handleAddUser}
                  bg="$primary500"
                  _hover={{ bg: '$primary600' }}
                >
                  <Text className="text-white">Save</Text>
                </Button>
                <Button
                  flex={1}
                  onPress={() => setIsAddingUser(false)}
                  bg="$backgroundLight200"
                  _hover={{ bg: '$backgroundLight300' }}
                >
                  <Text>Cancel</Text>
                </Button>
              </HStack>
            </VStack>
          </Box>
        )}

        {/* Users List */}
        <ScrollView>
          <VStack space="md">
            {users.map((user) => (
              <Box
                key={user.id}
                bg="$backgroundLight50"
                p="$4"
                rounded="$lg"
                borderWidth={1}
                borderColor="$borderLight200"
              >
                <HStack justifyContent="space-between" alignItems="center">
                  <VStack>
                    <Text className="text-lg font-semibold text-gray-900">
                      {user.name}
                    </Text>
                    <Text className="text-gray-500">{user.email}</Text>
                    <Text className="text-gray-400">Role: {user.role}</Text>
                  </VStack>
                  <HStack space="sm">
                    <Pressable
                      onPress={() => {/* TODO: Implement edit */}}
                      p="$2"
                      rounded="$md"
                      _hover={{ bg: '$backgroundLight200' }}
                    >
                      <Icon
                        as={MaterialIcons}
                        name="edit"
                        size="sm"
                        color="$textLight900"
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => handleDeleteUser(user.id)}
                      p="$2"
                      rounded="$md"
                      _hover={{ bg: '$backgroundLight200' }}
                    >
                      <Icon
                        as={MaterialIcons}
                        name="delete"
                        size="sm"
                        color="$textLight900"
                      />
                    </Pressable>
                  </HStack>
                </HStack>
              </Box>
            ))}
            {users.length === 0 && (
              <Text className="text-gray-500 text-center py-4">
                No users found. Add your first user!
              </Text>
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </Box>
  );
};

export default Users; 