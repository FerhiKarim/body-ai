import { Button, ButtonText } from '@/components/ui/button';
import { FormControl, FormControlLabel, FormControlLabelText } from '@/components/ui/form-control';
import { Input, InputField } from '@/components/ui/input';
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from '@/components/ui/modal';
import { Select, SelectContent, SelectInput, SelectItem, SelectPortal, SelectTrigger } from '@/components/ui/select';
import { VStack } from '@/components/ui/vstack';
import { useOnboarding } from '@/providers/OnboardingProvider';
import React, { useState } from 'react';

interface ProfileEditFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileEditForm({ isOpen, onClose }: ProfileEditFormProps) {
  const { onboardingData, updateOnboardingData } = useOnboarding();
  const [formData, setFormData] = useState(onboardingData);

  const handleSave = () => {
    updateOnboardingData(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack space="md">
            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Gender</FormControlLabelText>
              </FormControlLabel>
              <Select
                selectedValue={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
              >
                <SelectTrigger>
                  <SelectInput placeholder="Select gender" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    <SelectItem label="Male" value="male" />
                    <SelectItem label="Female" value="female" />
                    <SelectItem label="Other" value="other" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Age</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="number"
                  value={formData.age}
                  onChangeText={(value) => setFormData({ ...formData, age: value })}
                  placeholder="Enter age"
                />
              </Input>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Height (cm)</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="number"
                  value={formData.height}
                  onChangeText={(value) => setFormData({ ...formData, height: value })}
                  placeholder="Enter height"
                />
              </Input>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Weight (kg)</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="number"
                  value={formData.weight}
                  onChangeText={(value) => setFormData({ ...formData, weight: value })}
                  placeholder="Enter weight"
                />
              </Input>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Waist (cm)</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="number"
                  value={formData.waist}
                  onChangeText={(value) => setFormData({ ...formData, waist: value })}
                  placeholder="Enter waist measurement"
                />
              </Input>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Neck (cm)</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="number"
                  value={formData.neck}
                  onChangeText={(value) => setFormData({ ...formData, neck: value })}
                  placeholder="Enter neck measurement"
                />
              </Input>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Hip (cm)</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="number"
                  value={formData.hip}
                  onChangeText={(value) => setFormData({ ...formData, hip: value })}
                  placeholder="Enter hip measurement"
                />
              </Input>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Daily Routine</FormControlLabelText>
              </FormControlLabel>
              <Select
                selectedValue={formData.dailyRoutine}
                onValueChange={(value) => setFormData({ ...formData, dailyRoutine: value })}
              >
                <SelectTrigger>
                  <SelectInput placeholder="Select activity level" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    <SelectItem label="Low" value="low" />
                    <SelectItem label="Average" value="average" />
                    <SelectItem label="High" value="high" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Goals</FormControlLabelText>
              </FormControlLabel>
              <Select
                selectedValue={formData.goals[0]}
                onValueChange={(value) => setFormData({ ...formData, goals: [value] })}
              >
                <SelectTrigger>
                  <SelectInput placeholder="Select goal" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    <SelectItem label="Maintaining Weight" value="maintaining_weight" />
                    <SelectItem label="Improve Fitness" value="improve_fitness" />
                    <SelectItem label="Losing Weight" value="losing_weight" />
                    <SelectItem label="Build Muscle" value="build_muscle" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Workout Days per Week</FormControlLabelText>
              </FormControlLabel>
              <Select
                selectedValue={formData.workoutDays}
                onValueChange={(value) => setFormData({ ...formData, workoutDays: value })}
              >
                <SelectTrigger>
                  <SelectInput placeholder="Select days" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <SelectItem key={day} label={`${day} days`} value={String(day)} />
                    ))}
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Nutrition Preferences</FormControlLabelText>
              </FormControlLabel>
              <Select
                selectedValue={formData.nutritionPreferences}
                onValueChange={(value) => setFormData({ ...formData, nutritionPreferences: value })}
              >
                <SelectTrigger>
                  <SelectInput placeholder="Select preference" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    <SelectItem label="No Restrictions" value="no_restrictions" />
                    <SelectItem label="Keto" value="keto" />
                    <SelectItem label="Vegan" value="vegan" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Medical Conditions</FormControlLabelText>
              </FormControlLabel>
              <Select
                selectedValue={formData.medicalConditions}
                onValueChange={(value) => setFormData({ ...formData, medicalConditions: value })}
              >
                <SelectTrigger>
                  <SelectInput placeholder="Select condition" />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    <SelectItem label="Healthy" value="healthy" />
                    <SelectItem label="Diabetes" value="diabetes" />
                    <SelectItem label="Knee Pain" value="knee_pain" />
                    <SelectItem label="Back Pain" value="back_pain" />
                    <SelectItem label="Heart Problems" value="heart_problems" />
                    <SelectItem label="Asthma" value="asthma" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </FormControl>





            <Button onPress={handleSave} className="mt-4">
              <ButtonText>Save Changes</ButtonText>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}